package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type RaceModelHandler interface {
	AddRace(fiber.Ctx) error
	GetRaceById(fiber.Ctx) error
	GetAllRace(fiber.Ctx) error
	DeleteRaceById(fiber.Ctx) error
	UpdateRaceById(fiber.Ctx) error
}

type RaceModelStore interface {
	AddRace(raceData types.RaceType) (types.RaceType, error)
	GetRaceById(id string) (types.RaceType, error)
	GetAllRace() ([]types.RaceType, error)
	DeleteRaceById(id string) (bool, error)
	UpdateRaceById(id string, updatedData types.RaceType) (types.RaceType, error)
}
