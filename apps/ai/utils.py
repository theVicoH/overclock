import torch
import pika
import json
import os


def initialize_yolo():
    model_path = 'apps/IA/YOLO/yolov7-w6.pt'
    model = torch.load(model_path)
    model.eval()
    return model


def send_command(command):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))#brocker
    channel = connection.channel()
    channel.queue_declare(queue='commands')
    channel.basic_publish(exchange='', routing_key='commands', body=json.dumps(command))
    connection.close()

def receive_data():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost')) #brocker
    channel = connection.channel()
    channel.queue_declare(queue='sensor_data')
    channel.basic_consume(queue='sensor_data', on_message_callback=lambda ch, method, properties, body: print(body), auto_ack=True)
    channel.start_consuming()
