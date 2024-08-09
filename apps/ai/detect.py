import cv2
import numpy as np
import json

from pid_controller import PIDController
from functions import initialize_yolo, send_message, connect_mqtt

def process_frame(frame, model, pid, client):
    detections = model(frame)

    for detection in detections.xyxy[0]: 
        x1, y1, x2, y2, conf, cls = detection
        
        if conf > 0.5:
            center_x = int((x1 + x2) / 2)
            center_y = int((y1 + y2) / 2)
            width = int(x2 - x1)
            height = int(y2 - y1)
            
            error = center_x - (frame.shape[1] // 2)
            control_signal = pid.update(error, 0.1) 
            
            send_message(client, "esp32/sonar", json.dumps({
                'action': 'adjust', 
                'value': control_signal
            }))
            
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"{model.names[int(cls)]}: {conf:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

def main():
    model = initialize_yolo('C:/Users/MON PC/OneDrive/Bureau/Projet fil rouge/overclock/apps/yolo/yolov7-w6.pt')
    
    pid = PIDController(0.1, 0.01, 0.05)
    
    client = connect_mqtt()
    
    cap = cv2.VideoCapture(0)
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

if __name__ == "__main__":
    main()
