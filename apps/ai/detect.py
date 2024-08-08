import cv2
import numpy as np
import json

from pid_controller import PIDController
from functions import initialize_yolo, send_message, connect_mqtt

def process_frame(frame, model, pid, client):
    # Convertir l'image en format approprié pour le modèle (si nécessaire)
    # Par exemple, si le modèle YOLO s'attend à une image de format (640, 640), redimensionner l'image
    # frame = cv2.resize(frame, (640, 640))

    # Effectuer la détection avec le modèle YOLO
    detections = model(frame)

    # Traiter chaque détection
    for detection in detections.xyxy[0]: 
        x1, y1, x2, y2, conf, cls = detection
        
        # Filtrer les détections avec une confiance suffisante
        if conf > 0.5:
            # Calculer le centre et les dimensions de la boîte de détection
            center_x = int((x1 + x2) / 2)
            center_y = int((y1 + y2) / 2)
            width = int(x2 - x1)
            height = int(y2 - y1)
            
            # Calculer l'erreur pour le contrôle PID
            error = center_x - (frame.shape[1] // 2)
            control_signal = pid.update(error, 0.1)  # Le temps entre les mises à jour est de 0.1 seconde
            
            # Envoyer le signal de contrôle à l'ESP32 via MQTT
            send_message(client, "esp32/sonar", json.dumps({
                'action': 'adjust', 
                'value': control_signal
            }))
            
            # Dessiner une boîte de détection et afficher le nom de la classe avec la confiance
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, f"{model.names[int(cls)]}: {conf:.2f}", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

def main():
    # Initialiser le modèle YOLO avec le chemin du fichier du modèle
    model = initialize_yolo('C:/Users/MON PC/OneDrive/Bureau/Projet fil rouge/overclock/apps/yolo/yolov7-w6.pt')
    
    # Initialiser le contrôleur PID avec les gains appropriés
    pid = PIDController(0.1, 0.01, 0.05)
    
    # Se connecter au broker MQTT
    client = connect_mqtt()
    
    # Ouvrir la connexion à la caméra
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Failed to connect to camera")
        return

    while True:
        # Lire une image de la caméra
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to read frame from camera")
            break
        
        # Traiter l'image et effectuer la détection
        process_frame(frame, model, pid, client)
        
        # Afficher l'image avec les détections
        cv2.imshow('Frame', frame)
        
        # Quitter la boucle si la touche 'q' est pressée
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Libérer la connexion à la caméra et fermer les fenêtres OpenCV
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
