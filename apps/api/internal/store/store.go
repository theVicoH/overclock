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
		SensorModelInterface:     NewSenSorDataStore(db),
		StatsRaceInterface:       NewStatsRaceStore(db),
		ThresholdsModelInterface: NewThresholdsStore(db),
		VehicleModelInterface:    NewVehicleStore(db),
		RaceModelInterface:       NewRaceStore(db),
	}
}

type StoreStruct struct {
	model.SensorModelInterface
	model.StatsRaceInterface
	model.ThresholdsModelInterface
	model.VehicleModelInterface
	model.RaceModelInterface
}
