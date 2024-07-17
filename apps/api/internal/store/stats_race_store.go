package store

import (
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
