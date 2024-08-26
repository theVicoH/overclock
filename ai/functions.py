import paho.mqtt.client as mqtt
import logging
import torch

logging.basicConfig(level=logging.INFO)

def fail_on_error(err, msg):
    if err:
        logging.error(f"{msg}: {err}")
        exit(1)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        logging.info("Connected to MQTT broker")
    else:
        fail_on_error(rc, "Failed to connect to MQTT broker")

def on_message(client, userdata, msg):
    logging.info(f"Received message: {msg.payload.decode()} from topic: {msg.topic}")

def connect_mqtt():
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
    result = client.publish(topic, payload)
    status = result.rc
    if status == mqtt.MQTT_ERR_SUCCESS:
        logging.info(f" [x] Congrats, sending message: {payload}")
    else:
        fail_on_error(status, "Failed to publish a message")

def initialize_yolo(model_path):
    model = torch.hub.load('WongKinYiu/yolov7', 'custom', path_or_model=model_path, source='github')
    return model