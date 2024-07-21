package store

import (
	"Overclock/internal/types"
	"database/sql"
)

type StatsStore struct {
	*sql.DB
}

func NewStatsRaceStore(db *sql.DB) *StatsStore {
	return &StatsStore{
		db,
	}
}

func (s *StatsStore) AddStatsRace(statsRace types.StatsRaceType) (bool, error) {

	return false, nil
}

func (s *StatsStore) GetStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	return statsRace, nil
}

func (s *StatsStore) DeleteStatsRaceById(id int) (bool, error) {

	return false, nil
}

func (s *StatsStore) UpdateStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	return statsRace, nil
}
