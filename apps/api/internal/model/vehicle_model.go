package model

import "Overclock/internal/types"

type VehicleModelInterface interface {
	AddVehicle(vehicle types.VehicleType) (bool, error)
	GetVehicleById(id int) (types.VehicleType, error)
	DeleteVehicleById(id int) (bool, error)
	UpdateVehicleById(id int) (types.VehicleType, error)
}
