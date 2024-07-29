import cv2
import numpy as np
import json
import threading
import psycopg2
import pika
import os

# Paramètres PID
KP = 0.1
KI = 0.01
KD = 0.05

# Classe pour le contrôleur PID
class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.integral = 0
        self.last_error = 0
    
    def update(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.last_error) / dt
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.last_error = error
        return output

# Fonction pour envoyer des commandes à la voiture via RabbitMQ
def send_command(command):
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST", 'localhost')))
        channel = connection.channel()
        channel.queue_declare(queue='car_commands')
        message = json.dumps(command)
        channel.basic_publish(exchange='', routing_key='car_commands', body=message)
        connection.close()
        print(f"Sent command: {message}")
    except Exception as e:
        print(f"Failed to send command to RabbitMQ: {e}")

# Fonction pour traiter les données des capteurs reçues de RabbitMQ
def process_sensor_data(data):
    # store_data('sensor_data', data)
    if data['distance'] < 10:  # Exemple de condition pour l'arrêt automatique
        print("Obstacle detected: Stopping the vehicle")
        # store_data('logs', {'level': 'WARNING', 'message': 'Obstacle detected: Stopping the vehicle'})
        send_command({'action': 'stop'})

# Fonction pour recevoir les données de RabbitMQ
def receive_data():
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST", 'localhost')))
        channel = connection.channel()
        channel.queue_declare(queue='car_data')

        def callback(ch, method, properties, body):
            data = json.loads(body)
            print("Received data:", data)
            process_sensor_data(data)

        channel.basic_consume(queue='car_data', on_message_callback=callback, auto_ack=True)
        channel.start_consuming()
    except Exception as e:
        print(f"Failed to connect to RabbitMQ: {e}")

# Démarrer le thread pour recevoir les données de RabbitMQ
threading.Thread(target=receive_data, daemon=True).start()

# Initialisation de YOLO pour détecter les objets
def initialize_yolo():
    yolov3_weights = '../yolo/yolov3.weights'
    yolov3_cfg = '../yolo/yolov3.cfg'
    coco_names = '../yolo/coco.names'
    net = cv2.dnn.readNet(yolov3_weights, yolov3_cfg)
    classes = []
    with open(coco_names, 'r') as f:
        classes = [line.strip() for line in f.readlines()]
    return net, classes

net, classes = initialize_yolo()

# Fonction de détection d'objets
def detect_objects(net, frame):
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    outs = net.forward(output_layers)
    return outs

# Connexion à la base de données PostgreSQL
"""
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port="5432"
)
"""

'''def store_data(table, data):
    with conn.cursor() as cursor:
        if table == 'sensor_data':
            cursor.execute("""
                INSERT INTO sensor_data (distance, line)
                VALUES (%s, %s)
            """, (data['distance'], data['line']))
        elif table == 'object_detection':
            cursor.execute("""
                INSERT INTO object_detection (class_id, class_name, confidence, x, y, width, height)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (data['class_id'], data['class_name'], data['confidence'], data['x'], data['y'], data['width'], data['height']))
        elif table == 'control_signals':
            cursor.execute("""
                INSERT INTO control_signals (signal_type, value)
                VALUES (%s, %s)
            """, (data['signal_type'], data['value']))
        elif table == 'logs':
            cursor.execute("""
                INSERT INTO logs (level, message)
                VALUES (%s, %s)
            """, (data['level'], data['message']))
        conn.commit()'''

# Initialisation du contrôleur PID
pid = PIDController(KP, KI, KD)

# Connexion à la caméra (URL de la caméra)
cap = cv2.VideoCapture("http://your_camera_stream_url")

if not cap.isOpened():
    print("Error: Failed to connect to camera")
    exit()

net, classes = initialize_yolo()

try:
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame from camera. Exiting...")
            break
        
        # Détection d'objets
        outs = detect_objects(net, frame)
        
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.5:
                    center_x = int(detection[0] * frame.shape[1])
                    center_y = int(detection[1] * frame.shape[0])
                    width = int(detection[2] * frame.shape[1])
                    height = int(detection[3] * frame.shape[0])
                    x = int(center_x - width / 2)
                    y = int(center_y - height / 2)
                    # store_data('object_detection', {
                    #     'class_id': class_id,
                    #     'class_name': classes[class_id],
                    #     'confidence': confidence,
                    #     'x': x,
                    #     'y': y,
                    #     'width': width,
                    #     'height': height
                    # })
                    cv2.rectangle(frame, (x, y), (x + width, y + height), (0, 255, 0), 2)
                    cv2.putText(frame, f"{classes[class_id]}: {confidence:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Simulation d'une erreur de trajectoire
        trajectory_error = np.random.randn()
        control_signal = pid.update(trajectory_error, 0.1)
        # store_data('control_signals', {'signal_type': 'trajectory_adjustment', 'value': control_signal})
        
        if trajectory_error > 1.0:  # Condition pour l'arrêt automatique (exemple)
            print("Obstacle detected: Stopping the vehicle")
            # store_data('logs', {'level': 'WARNING', 'message': 'Obstacle detected: Stopping the vehicle'})
            send_command({'action': 'stop'})
            break
        
        # Envoi de commandes à la voiture
        if control_signal > 0:
            send_command({'action': 'adjust', 'value': control_signal})
        else:
            send_command({'action': 'adjust', 'value': -control_signal})
        
        # Afficher la sortie de la vidéo
        cv2.imshow("Video", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            send_command({'action': 'stop'})
            break
except Exception as e:
    print(f"An error occurred: {e}")
    # store_data('logs', {'level': 'ERROR', 'message': str(e)})
finally:
    cap.release()
    cv2.destroyAllWindows()
    # conn.close()