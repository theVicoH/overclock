package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type SensorModelHandler interface {
	MessageCallback(message string , topic string)
	AddSensorData(fiber.Ctx) error
	GetSensorDataById(fiber.Ctx) error
	DeleteSensorDataById(fiber.Ctx) error
	UpdateSensorDataById(fiber.Ctx) error
}

type SensorModelStore interface {
	AddSensorData(sensorData types.SensorData) (bool, error)
	GetSensorDataById(id int) (types.SensorData, error)
	DeleteSensorDataById(id int) (bool, error)
	UpdateSensorDataById(id int) (types.SensorData, error)
}
