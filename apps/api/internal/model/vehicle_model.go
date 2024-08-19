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
	GetAllVehicle(fiber.Ctx) error
}

type VehicleModelStore interface {
	AddVehicle(vehicle types.VehicleType) (types.VehicleType, error)
	GetVehicleById(id string) (types.VehicleType, error)
	DeleteVehicleById(id string) (bool, error)
	UpdateVehicleById(id string, vehicleType types.VehicleType) (types.VehicleType, error)
	GetAllVehicle() ([]types.VehicleType, error)
}
