import cv2
import json

from pid_controller import PIDController
from functions import initialize_yolo, send_message, connect_mqtt

sonar_distance = float('inf')
automatic_mode = True 
SONAR_THRESHOLD = 3
#video_stream_url = ""  # URL du flux vidéo

def on_message(client, userdata, msg):
    print(f"Received message on topic {msg.topic}") 
    payload = msg.payload.decode()
    print(f"Message payload: {payload}") 
    
    try:
        if msg.topic == "esp32/sonar":
            global sonar_distance
            sonar_distance = float(payload)
            print(f"Updated sonar distance: {sonar_distance}")

        elif msg.topic == "esp32/mode":
            global automatic_mode
            automatic_mode = payload.lower() == "automatic"
            print(f"Automatic mode set to: {automatic_mode}")

    except ValueError:
        print(f"Error parsing message: {payload}")


def send_adjustment_command(client, cmd_id, data_values):
    message = {
        "cmd": cmd_id,
        "data": data_values
    }
    send_message(client, "esp32/ajustments", json.dumps(message))

def process_frame(frame, model, pid, client):
    detections = model(frame)
    obstacle_detected = False
    control_signal = 0

    for detection in detections.xyxy[0]: 
        x1, y1, x2, y2, conf, cls = detection
        
        if conf > 0.5:
            center_x = int((x1 + x2) / 2)
            error = center_x - (frame.shape[1] // 2)
            control_signal = pid.update(error, 0.1) 
            
            send_adjustment_command(client, 1, [control_signal, control_signal, control_signal, control_signal])

            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"{model.names[int(cls)]}: {conf:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
            obstacle_detected = True
    
    if sonar_distance <= SONAR_THRESHOLD and automatic_mode:
        send_adjustment_command(client, 1, [0, 0, 0, 0])  # Stop
    elif obstacle_detected and automatic_mode:
        send_adjustment_command(client, 1, [control_signal, control_signal, control_signal, control_signal])  # Avoid
    elif not obstacle_detected and automatic_mode:
        send_adjustment_command(client, 1, [2000, 2000, 2000, 2000])  # Continue

def main():
    model = initialize_yolo('../yolo/yolov7-w6.pt')
    pid = PIDController(0.1, 0.01, 0.05)
    
    client = connect_mqtt()
    client.on_message = on_message
    
    client.subscribe("esp32/sonar")
    client.subscribe("esp32/mode") 
    #client.subscribe("esp32/camera")

    client.loop_start()

    cap = cap = cv2.VideoCapture(0) #URL CAMERA pour linstant local pour test
    
    if not cap.isOpened():
        print("Error: Failed to connect to camera")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to read frame from camera")
            break
        
        process_frame(frame, model, pid, client)
        
        cv2.imshow('Frame', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    client.loop_stop()

if __name__ == "__main__":
    main()
