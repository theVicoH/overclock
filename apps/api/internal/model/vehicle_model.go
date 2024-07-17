package model

import "Overclock/internal/types"

type VehicleModelInterface interface {
	AddVehicle(vehicle types.VehicleType) (error, bool)
}
