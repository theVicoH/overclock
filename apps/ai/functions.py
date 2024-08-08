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
    status = result[0]
    if status == 0:
        logging.info(f" [x] Congrats, sending message: {payload}")
    else:
        fail_on_error(status, "Failed to publish a message")

def read_messages(client, topic):
    client.subscribe(topic)
    logging.info(f"Subscribed to topic: {topic}")
    client.loop_start() 

def initialize_yolo(model_path):
    model = torch.hub.load('WongKinYiu/yolov7', 'custom', path_or_model=model_path, source='github')
    return model



if __name__ == "__main__":
    client = connect_mqtt()  
    read_messages(client, "esp32/sonar") 
    send_message(client, "esp32/sonar", "Hello, MQTT!") 
    send_message(client, "esp32/sonar", "Hello, MQTT 2!") 

    
    try:

        logging.info("Listening for messages. Press Ctrl+C to exit.")
        while True:
            pass
    except KeyboardInterrupt:
        logging.info("Exiting...")
        client.loop_stop()
        client.disconnect()
