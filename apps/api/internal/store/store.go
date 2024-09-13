package store

import (
	"Overclock/internal/model"

	"gorm.io/gorm"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type Store struct {
	db *gorm.DB
}

func CreateStore(db *gorm.DB, client *MQTT.Client) *StoreStruct {
	return &StoreStruct{
		SensorModelStore: NewSenSorDataStore(db),
		StatsRaceStore:   NewStatsRaceStore(db),
		RaceModelStore:   NewRaceStore(db),
	}
}

type StoreStruct struct {
	model.SensorModelStore
	model.StatsRaceStore
	model.RaceModelStore
}
