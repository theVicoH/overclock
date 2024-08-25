package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

type StatsRaceHandler interface {
	AddStatsRace(fiber.Ctx) error
	GetStatsRaceById(fiber.Ctx) error
	GetStatsRaceByVehiculeId(fiber.Ctx) error
	DeleteStatsRaceById(fiber.Ctx) error
	UpdateStatsRaceById(fiber.Ctx) error
}

type StatsRaceStore interface {
	AddStatsRace(statRace types.StatsRaceType) (bool, error)
	GetStatsRaceById(id string) (types.StatsRaceType, error)
	GetStatsRaceByVehiculeId(id string) (types.StatsRaceType, error)
	DeleteStatsRaceById(id string) (types.StatsRaceType, error)
	//UpdateStatsRaceById(id string) (types.StatsRaceType, error)
}

/*test commit*/
