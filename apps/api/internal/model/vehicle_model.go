package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type VehicleModelHandler interface {
	AddVehicle(fiber.Ctx) error
	GetVehicleById(fiber.Ctx) error
	DeleteVehicleById(fiber.Ctx) error
	UpdateVehicleById(fiber.Ctx) error
}

type VehicleModelStore interface {
	AddVehicle(vehicle types.VehicleType) (bool, error)
	GetVehicleById(id int) (types.VehicleType, error)
	DeleteVehicleById(id int) (bool, error)
	UpdateVehicleById(id int) (types.VehicleType, error)
}
