package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type StatsRaceHandler interface {
	AddStatsRace(fiber.Ctx) error
}

type StatsRaceStore interface {
	AddStatsRace(statRace types.StatsRaceType) (bool, error)
}
