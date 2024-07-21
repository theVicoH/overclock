package store

import (
	"Overclock/internal/model"
	"database/sql"
)

func CreateStore(db *sql.DB) *Store {
	return &Store{
		SensorModelInterface:     NewSenSorDataStore(db),
		StatsRaceInterface:       NewStatsRaceStore(db),
		ThresholdsModelInterface: NewThresholdsStore(db),
		VehicleModelInterface:    NewVehicleStore(db),
	}
}

type Store struct {
	model.SensorModelInterface
	model.StatsRaceInterface
	model.ThresholdsModelInterface
	model.VehicleModelInterface
}
