package model

import "Overclock/internal/types"

type RaceModelInterface interface {
	AddRace(raceData types.RaceType) (bool, error)
	GetRaceById(id int) (types.RaceType, error)
	DeleteRaceById(id int) (bool, error)
	UpdateRaceById(id int) (types.RaceType, error)
}
