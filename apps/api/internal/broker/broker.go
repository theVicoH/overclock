package broker

import (
	"fmt"
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
