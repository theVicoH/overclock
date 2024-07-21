package model

import "Overclock/internal/types"

type StatsRaceInterface interface {
	AddStatsRace(statRace types.StatsRaceType) (bool, error)
}
