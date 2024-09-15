package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type VehicleModelHandler interface {
	AddVehicle(fiber.Ctx) error
	GetVehicleById(fiber.Ctx) error
	GetAllVehicle(fiber.Ctx) error
	GetAllVehiclesWithRaces(fiber.Ctx) error
	GetVehicleWithRacesById(fiber.Ctx) error
	GetVehiclesStats(fiber.Ctx) error
	GetVehicleStatsById(fiber.Ctx) error
	GetClassementBySpeed(fiber.Ctx) error
}

type VehicleModelStore interface {
	AddVehicle(vehicle types.VehicleType) (types.VehicleType, error)
	GetVehicleById(id string) (types.VehicleType, error)
	GetAllVehicle() ([]types.VehicleType, error)
	GetAllVehiclesWithRaces() ([]types.VehicleWithRacesDetailType, error)
	GetVehicleWithRacesById(id uuid.UUID) (types.VehicleWithRacesDetailType, error)
	GetVehiclesStats() ([]types.VehicleStatsDetailType, error)
	GetVehicleStatsById(id uuid.UUID) ([]types.VehicleStatsDetailType, error)
	GetClassementBySpeed() ([]types.VehiculeClassementBySpeedMax, error)
}
