package broker

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func InitBroker() MQTT.Client {
	opts := MQTT.NewClientOptions()
	opts.AddBroker("tcp://176.132.246.222:5701")
	opts.SetClientID("go_mqtt_client")
	opts.SetUsername("guest")
	opts.SetPassword("guest")

	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Failed to connect to MQTT broker")
	}

	return client
}

func ReadMessages(client MQTT.Client, topic string, callback func(string, string)) {
    token := client.Subscribe(topic, 0, func(client MQTT.Client, msg MQTT.Message) {
        message := string(msg.Payload())
        fmt.Printf("Received message: %s from topic: %s\n", message, msg.Topic())
        callback(message, msg.Topic()) 
    })
    token.Wait()
    if token.Error() != nil {
        log.Fatalf("Failed to subscribe to topic: %v", token.Error())
    }

    // Wait for messages
    log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
    stop := make(chan os.Signal, 1)
    signal.Notify(stop, os.Interrupt)
    <-stop
}
