package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type ThresholdsModelHandler interface {
	AddThresholds(fiber.Ctx) error
	GetThresholdsById(fiber.Ctx) error
	DeleteThresholdsById(fiber.Ctx) error
	UpdateThresholdsById(fiber.Ctx) error
}

type ThresholdsModelStore interface {
	AddThresholds(thresholds types.ThresholdsType) (bool, error)
	GetThresholdsById(id int) (types.ThresholdsType, error)
	DeleteThresholdsById(id int) (bool, error)
	UpdateThresholdsById(id int) (types.ThresholdsType, error)
}
