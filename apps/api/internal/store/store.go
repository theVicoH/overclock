package store

import (
	"Overclock/internal/model"
	"gorm.io/gorm"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type Store struct {
	db *gorm.DB
}
type StoreMqtt struct {
	db     *gorm.DB
	client *MQTT.Client
}

func CreateStore(db *gorm.DB, client *MQTT.Client) *StoreStruct {
	return &StoreStruct{
		SensorModelStore:  NewSenSorDataStore(db),
		StatsRaceStore:    NewStatsRaceStore(db, client),
		VehicleModelStore: NewVehicleStore(db),
		RaceModelStore:    NewRaceStore(db),
	}
}
type StoreStruct struct {
	model.SensorModelStore
	model.StatsRaceStore
	model.VehicleModelStore
	model.RaceModelStore
}
