package store

import (
	"Overclock/internal/model"

	"gorm.io/gorm"
)

type Store struct {
	db *gorm.DB
}

func CreateStore(db *gorm.DB) *StoreStruct {
	return &StoreStruct{
		SensorModelStore:  NewSenSorDataStore(db),
		StatsRaceStore:    NewStatsRaceStore(db),
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
