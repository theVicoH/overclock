import cv2
import json
import time
import base64
import numpy as np
from pid_controller import PIDController
from functions import send_message, connect_mqtt, initialize_yolo

sonar_distance = float('inf')
automatic_mode = False  
SONAR_THRESHOLD = 3
frame = None  

def on_message(client, userdata, msg):
    global frame, sonar_distance, automatic_mode

    print(f"Received message on topic {msg.topic}")
    payload = msg.payload.decode()
    
    try:
        if msg.topic == "esp32/sonar":
            sonar_distance = float(payload)
            print(f"Updated sonar distance: {sonar_distance}")

        elif msg.topic == "esp32/mode":
            automatic_mode = payload.lower() == "auto"
            print(f"Automatic mode set to: {automatic_mode}")

        elif msg.topic == "esp32/camera":
            try:
                image_data = base64.b64decode(payload)
                np_array = np.frombuffer(image_data, np.uint8)
                frame = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
                print(f"Received and decoded image from camera")
            except Exception as e:
                print(f"Failed to decode image: {e}")

    except ValueError:
        print(f"Error parsing message: {payload}")

def send_adjustment_command(client, cmd_id, data_values, topic="esp32/ajustments"):
    message = {
        "cmd": cmd_id,
        "data": data_values
    }
    send_message(client, topic, json.dumps(message))

def send_alert(client):
    send_adjustment_command(client, 5, [1, 255, 0, 0], topic="esp32/alertleds")
    send_adjustment_command(client, 7, 1, topic="esp32/alertbip")
    
    time.sleep(3)
    
    send_adjustment_command(client, 5, [0, 0, 0, 0], topic="esp32/alertleds")
    send_adjustment_command(client, 7, 0, topic="esp32/alertbip")

def process_frame(frame, model, pid, client):
    detections = model(frame)
    obstacle_detected = False
    control_signal = 0
    person_fallen = False

    # Identifier l'index de la classe "person" dans les labels du modèle
    person_class_index = None
    for index, class_name in enumerate(model.names):
        if class_name == "person":
            person_class_index = index
            break

    if person_class_index is None:
        print("Error: 'person' class not found in the model labels")
        return

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

            # Vérifier si la détection correspond à une personne tombée
            if int(cls) == person_class_index and (y2 - y1) > (x2 - x1):
                person_fallen = True

    if person_fallen:
        send_alert(client)

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
    client.subscribe("esp32/led")
    client.subscribe("esp32/bip")
    client.subscribe("esp32/camera")

    client.loop_start()

    while True:
        if automatic_mode and frame is not None:
            process_frame(frame, model, pid, client)
            cv2.imshow('Frame', frame)
        
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            print("Waiting for automatic mode to be enabled or for frame data...")
            time.sleep(1)

    cv2.destroyAllWindows()
    client.loop_stop()

if __name__ == "__main__":
    main()
