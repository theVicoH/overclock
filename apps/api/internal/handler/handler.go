package handler

import (
	"Overclock/internal/model"
	"Overclock/internal/store"
)

type Handler struct {
	store *store.StoreStruct
}

func CreateHandler(store *store.StoreStruct) *HandlerStruct {
	return &HandlerStruct{
		SensorModelHandler:  NewSenSorDataHandler(store),
		StatsRaceHandler:    NewStatsRaceHandler(store),
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
