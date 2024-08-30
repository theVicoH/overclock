import paho.mqtt.client as mqtt
import logging
import torch

logging.basicConfig(level=logging.INFO)

def fail_on_error(err, msg):
    """
    Gère les erreurs en affichant un message et en arrêtant le script.

    Args:
        err: Code ou objet d'erreur.
        msg: Message d'erreur à afficher.
    """
    if err:
        logging.error(f"{msg}: {err}")
        exit(1)

def on_connect(client, userdata, flags, rc):
    """
    Callback pour la connexion MQTT, affiche un message de succès ou d'échec.

    Args:
        client: Instance du client MQTT.
        userdata: Données utilisateur associées au client.
        flags: Indicateurs MQTT.
        rc: Code de résultat de la connexion.
    """
    if rc == 0:
        logging.info("Connected to MQTT broker")
    else:
        fail_on_error(rc, "Failed to connect to MQTT broker")

def on_message(client, userdata, msg):
    """
    Callback pour la réception des messages MQTT.

    Args:
        client: Instance du client MQTT.
        userdata: Données utilisateur associées au client.
        msg: Message MQTT reçu.
    """
    logging.info(f"Received message: {msg.payload.decode()} from topic: {msg.topic}")

def connect_mqtt():
    """
    Connecte le client MQTT au broker et configure les callbacks.

    Returns:
        client: Instance du client MQTT connectée.
    """
    client = mqtt.Client(client_id="python_mqtt_client")

    # Set username and password
    client.username_pw_set("guest", "guest")

    # Assign the callbacks
    client.on_connect = on_connect
    client.on_message = on_message

    try:
        # Connect to the broker
        client.connect("176.132.246.222", 5701, 60)
    except Exception as e:
        fail_on_error(e, "Failed to connect to MQTT broker")

    return client

def send_message(client, topic, payload):
    """
    Envoie un message au broker MQTT sur un topic donné.

    Args:
        client: Instance du client MQTT.
        topic: Topic MQTT où envoyer le message.
        payload: Contenu du message.
    """
    result = client.publish(topic, payload)
    status = result.rc
    if status == mqtt.MQTT_ERR_SUCCESS:
        logging.info(f" [x] Congrats, sending message: {payload}")
    else:
        fail_on_error(status, "Failed to publish a message")

def initialize_yolo(model_path):
    """
    Initialise le modèle YOLO à partir du chemin spécifié.

    Args:
        model_path: Chemin du modèle YOLO à charger.

    Returns:
        model: Modèle YOLO chargé.
    """
    model = torch.hub.load('WongKinYiu/yolov7', 'custom', path_or_model=model_path, source='github')
    return model