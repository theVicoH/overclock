import cv2
from utils import initialize_yolo, send_command, receive_data
from pid_controller import PIDController

def main():
    model = initialize_yolo('apps/IA/YOLO/yolov7-w6.pt')
    pid = PIDController(0.1, 0.01, 0.05)

    # Connexion à la caméra 
    cap = cv2.VideoCapture("")

    if not cap.isOpened():
        print("Error: Failed to connect to the camera.")
        exit()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame. Exiting...")
            break
        
        detections = model(frame)
        for detection in detections:
            if detection['confidence'] > 0.5:
                pid.update(detection['error'], 0.1)
                send_command({'action': 'adjust', 'value': pid.output})
        
        cv2.imshow('Frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
