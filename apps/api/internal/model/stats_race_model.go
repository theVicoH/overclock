package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type StatsRaceHandler interface {
	AddStatsRace(fiber.Ctx) error
	GetStatsRaceById(fiber.Ctx) error
	DeleteStatsRaceById(fiber.Ctx) error
	UpdateStatsRaceById(fiber.Ctx) error
}

type StatsRaceStore interface {
	AddStatsRace(statRace types.StatsRaceType) (bool, error)
	GetStatsRaceById(id int) (types.StatsRaceType, error)
	DeleteStatsRaceById(id int) (bool, error)
	UpdateStatsRaceById(id int) (types.StatsRaceType, error)
}
