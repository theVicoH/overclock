package model

import "Overclock/internal/types"

type StatsRaceInterface interface {
	AddStatsRace(statRace types.StatsRaceType) (bool, error)
	GetStatsRaceById(id int) (types.StatsRaceType, error)
	DeleteStatsRaceById(id int) (bool, error)
	UpdateStatsRaceById(id int) (types.StatsRaceType, error)
}
