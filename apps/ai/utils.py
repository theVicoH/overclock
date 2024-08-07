import json
import os
import paho.mqtt.client as mqtt
import logging

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
    client = mqtt.Client("python_mqtt_client")
    client.username_pw_set("guest", "guest")
    client.on_connect = on_connect
    client.on_message = on_message
    
    try:
        client.connect("176.132.246.222", 5701, 60)
    except Exception as e:
        fail_on_error(e, "Failed to connect to MQTT broker")

    return client

def send_message(client, topic, payload):
    result = client.publish(topic, payload)
    status = result[0]
    if status == 0:
        logging.info(f" [x] Congrats, sending message: {payload}")
    else:
        fail_on_error(status, "Failed to publish a message")

def read_messages(client, topic):
    client.subscribe(topic)
    logging.info(" [*] Waiting for messages. To exit press CTRL+C")
    client.loop_start()

def initialize_yolo(model_path):
    import torch
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path, force_reload=True)
    return model
