package handler

import (
	"Overclock/internal/model"
	"Overclock/internal/store"
)

type Hanlder struct {
	store *store.StoreStruct
}

func CreateHandler(store *store.StoreStruct) *HandlerStruct {
	return &HandlerStruct{
		SensorModelHandler:     NewSenSorDataHandler(store),
		StatsRaceHandler:       NewStatsRaceHandler(store),
		ThresholdsModelHandler: NewThresholdsHandler(store),
		VehicleModelHandler:    NewVehicleHandler(store),
		RaceModelHandler:       NewRaceHandler(store),
	}
}

type HandlerStruct struct {
	model.SensorModelHandler
	model.StatsRaceHandler
	model.ThresholdsModelHandler
	model.VehicleModelHandler
	model.RaceModelHandler
}
