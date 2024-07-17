package main

import (
	"fmt"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

// MQTTMessageHandler handles incoming MQTT messages
func MQTTMessageHandler(client mqtt.Client, msg mqtt.Message) {
	fmt.Printf("Received message on topic: %s\nMessage: %s\n", msg.Topic(), msg.Payload())
}

// func test() {
// 	broker := "tcp://195.15.198.5:1883"
// 	clientID := "test_mqtt_client"
// 	username := "guest"
// 	password := "guest"

// 	opts := mqtt.NewClientOptions().AddBroker(broker)
// 	opts.SetClientID(clientID)
// 	opts.SetUsername(username)
// 	opts.SetPassword(password)
// 	opts.SetDefaultPublishHandler(MQTTMessageHandler)

// 	client := mqtt.NewClient(opts)
// 	if token := client.Connect(); token.Wait() && token.Error() != nil {
// 		log.Fatalf("Error connecting to MQTT broker: %v", token.Error())
// 	}

// 	topic := "#"
// 	if token := client.Subscribe(topic, 0, nil); token.Wait() && token.Error() != nil {
// 		log.Fatalf("Error subscribing to topic: %v", token.Error())
// 	}

// 	fmt.Printf("Subscribed to topic: %s\n", topic)

// 	// Graceful shutdown
// 	c := make(chan os.Signal, 1)
// 	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

// 	<-c
// 	fmt.Println("Gracefully shutting down...")

// 	client.Disconnect(250)
// 	fmt.Println("Disconnected from MQTT broker")
// }
