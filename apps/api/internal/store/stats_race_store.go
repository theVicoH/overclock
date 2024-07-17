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
	return true, nil
}
