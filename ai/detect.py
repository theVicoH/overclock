import cv2
import json
import time
import numpy as np
from pid_controller import PIDController
from functions import send_message, connect_mqtt, initialize_yolo

sonar_distance = float('inf')
automatic_mode = False  
SONAR_THRESHOLD = 3

def on_message(client, userdata, msg):
    """
    Gère les messages MQTT reçus et met à jour les variables globales.

    Args:
        client: Instance du client MQTT.
        userdata: Données utilisateur associées au client.
        msg: Message MQTT reçu.
    """
    global sonar_distance, automatic_mode

    print(f"Received message on topic {msg.topic}")
    payload = msg.payload
    
    try:
        if msg.topic == "esp32/sonar":
            sonar_distance = float(payload.decode())
            print(f"Updated sonar distance: {sonar_distance}")

        elif msg.topic == "esp32/mode":
            automatic_mode = payload.decode().lower() == "auto"
            print(f"Automatic mode set to: {automatic_mode}")

    except ValueError:
        print(f"Error parsing message: {payload}")

def send_adjustment_command(client, cmd_id, data_values, topic="ia/ajustments"):
    """
    Envoie une commande d'ajustement à un topic MQTT.

    Args:
        client: Instance du client MQTT.
        cmd_id: Identifiant de la commande.
        data_values: Valeurs de la commande.
        topic: Topic MQTT pour l'envoi.
    """
    message = {
        "cmd": cmd_id,
        "data": data_values
    }
    send_message(client, topic, json.dumps(message))

def send_alert(client):
    """
    Envoie une alerte via les LEDs et le buzzer en MQTT.

    Args:
        client: Instance du client MQTT.
    """
    send_adjustment_command(client, 5, [1, 255, 0, 0], topic="ia/alertleds")
    send_adjustment_command(client, 7, 1, topic="ia/alertbip")
    
    time.sleep(3)
    
    send_adjustment_command(client, 5, [0, 0, 0, 0], topic="ia/alertleds")
    send_adjustment_command(client, 7, 0, topic="ia/alertbip")

def process_frame(frame, model, pid, client):
    """
    Traite l'image pour détecter des obstacles et traite une situation critique (une personne par terre).

    Args:
        frame: Image capturée.
        model: Modèle YOLO pour la détection.
        pid: Contrôleur PID.
        client: Instance du client MQTT.
    """
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
                
    # Envoie une alerte si une personne est tombée
    if person_fallen and automatic_mode:
        send_alert(client)

    if automatic_mode:
        if sonar_distance <= SONAR_THRESHOLD:
            if obstacle_detected:
                # Priorité à l'évitement si un obstacle est détecté par YOLO
                send_adjustment_command(client, 1, [control_signal, control_signal, control_signal, control_signal])  # Éviter
            else:
                # Arrêt uniquement si aucun obstacle n'est détecté par YOLO
                send_adjustment_command(client, 1, [0, 0, 0, 0])  # Arrêt immédiat
        elif obstacle_detected:
            send_adjustment_command(client, 1, [control_signal, control_signal, control_signal, control_signal])  # Éviter
        else:
            send_adjustment_command(client, 1, [2000, 2000, 2000, 2000])  # Continuer

def main():
    """
    Initialise le modèle YOLO, le contrôleur PID et le client MQTT,
    puis démarre la boucle principale.
    """
    model = initialize_yolo('./yolo/yolov7-w6.pt')
    pid = PIDController(0.1, 0.01, 0.05)
    
    client = connect_mqtt()
    client.on_message = on_message
    
    client.subscribe("esp32/sonar")
    client.subscribe("esp32/mode") 
    client.subscribe("ia/led")
    client.subscribe("ia/bip")
    
    client.loop_start()

    #connexion au flux vidéo
    cap = None
    stream_url = 'http://192.168.1.150:7000/'
    
    while True:
        if automatic_mode:
            if cap is None or not cap.isOpened():
                print("Attempting to connect to video stream...")
                cap = cv2.VideoCapture(stream_url)
                if not cap.isOpened():
                    print(f"Failed to open video stream from URL: {stream_url}")
                    time.sleep(2)
                    continue 
                else:
                    print("Connected to video stream successfully.")

            ret, frame = cap.read()
            if not ret:
                print("Failed to read frame from stream.")
                cap.release()
                cap = None
                continue

            process_frame(frame, model, pid, client)
            cv2.imshow('Frame', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            print("Waiting for automatic mode to be enabled...")
            time.sleep(1)

    if cap is not None:
        cap.release()
    cv2.destroyAllWindows()
    client.loop_stop()

if __name__ == "__main__":
    main()
