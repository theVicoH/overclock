package store

import (
	"database/sql"
)

type SensorStore struct {
	*sql.DB
}

func NewSenSorDataStore(db *sql.DB) *SensorStore {
	return &SensorStore{
		db,
	}
}
