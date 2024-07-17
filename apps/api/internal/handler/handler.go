package handler

import (
	"Overclock/internal/facade"
	"log"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type VideoHandler struct {
	videoService facade.VideoService
	mqttClient   mqtt.Client
}

func NewVideoHandler(videoService facade.VideoService, broker string, clientID string, username string, password string) *VideoHandler {
	handler := &VideoHandler{
		videoService: videoService,
	}
	handler.mqttClient = InitializeMQTT(broker, clientID, username, password, handler.Video, "esp32/sonar")
	return handler
}

func InitializeMQTT(broker, clientID, username, password string, handler mqtt.MessageHandler, topic string) mqtt.Client {
	opts := mqtt.NewClientOptions().AddBroker(broker)
	opts.SetClientID(clientID)
	opts.SetUsername(username)
	opts.SetPassword(password)

	opts.SetDefaultPublishHandler(handler)
	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		log.Fatalf("Error connecting to MQTT broker: %v", token.Error())
	}

	if token := client.Subscribe(topic, 0, nil); token.Wait() && token.Error() != nil {
		log.Fatalf("Error subscribing to topic: %v", token.Error())
	}

	return client
}
