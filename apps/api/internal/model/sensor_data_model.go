package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type SensorModelHandler interface {
	MessageCallback(message string, topic string)
	GetSensorDataById(fiber.Ctx) error
	GetSpeedLastTenMin(fiber.Ctx) error
	GetConsumptionLastTenMin(fiber.Ctx) error
}

type SensorModelStore interface {
	AddSensorData(sensorData types.SensorData) (bool, error)
	GetSensorDataByRaceId(id uuid.UUID) ([]types.SensorData, error)
	GetSpeedLastTenMin(id string) ([]types.SensorSpeed, error)
	GetConsumptionLastTenMin(id string) ([]types.SensorConsumption, error)
}
