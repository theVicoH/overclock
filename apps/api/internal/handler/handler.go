package handler

import (
	"Overclock/internal/model"
	"Overclock/internal/store"

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
		SensorModelHandler:  NewSenSorDataHandler(store, client),
		StatsRaceHandler:    NewStatsRaceHandler(store, client),
		VehicleModelHandler: NewVehicleHandler(store),
		RaceModelHandler:    NewRaceHandler(store),
	}
}

type HandlerStruct struct {
	model.SensorModelHandler
	model.StatsRaceHandler
	model.VehicleModelHandler
	model.RaceModelHandler
}
