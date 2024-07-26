package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type SensorModelHandler interface {
	AddSensorData(fiber.Ctx) error
	GetSensorDataById(fiber.Ctx) error
	DeleteSensorDataById(fiber.Ctx) error
	UpdateSensorDataById(fiber.Ctx) error
}

type SensorModelStore interface {
	AddSensorData(sensorData types.SensorDataType) (bool, error)
	GetSensorDataById(id int) (types.SensorDataType, error)
	DeleteSensorDataById(id int) (bool, error)
	UpdateSensorDataById(id int) (types.SensorDataType, error)
}
