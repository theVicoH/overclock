package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type RaceModelHandler interface {
	AddRace(fiber.Ctx) error
	GetRaceById(fiber.Ctx) error
	DeleteRaceById(fiber.Ctx) error
	UpdateRaceById(fiber.Ctx) error
}

type RaceModelStore interface {
	AddRace(raceData types.RaceType) (bool, error)
	GetRaceById(id int) (types.RaceType, error)
	DeleteRaceById(id int) (bool, error)
	UpdateRaceById(id int) (types.RaceType, error)
}
