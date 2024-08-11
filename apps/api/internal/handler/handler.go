package handler

import (
	"Overclock/internal/model"
	"Overclock/internal/store"
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type Handler struct {
	store *store.StoreStruct
}

type HandlerMqtt struct {
	store  *store.StoreStruct
	client *MQTT.Client
}

func CreateHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerStruct {
	return &HandlerStruct{
		// SensorModelHandler:  NewSenSorDataHandler(store),
		StatsRaceHandler:    NewStatsRaceHandler(store, client),
		VehicleModelHandler: NewVehicleHandler(store),
		RaceModelHandler:    NewRaceHandler(store),
	}
}

func ReadMessages(client MQTT.Client, topic string) string {
	var message string
	token := client.Subscribe(topic, 0, func(client MQTT.Client, msg MQTT.Message) {
		message = string(msg.Payload())
	})
	token.Wait()
	if token.Error() != nil {
		fmt.Printf("Failed to subscribe to topic")
	}

	return message
}


type HandlerStruct struct {
	// model.SensorModelHandler
	model.StatsRaceHandler
	model.VehicleModelHandler
	model.RaceModelHandler
}
