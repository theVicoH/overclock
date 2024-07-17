package store

import (
	"database/sql"
)

type ThresholdsStore struct {
	*sql.DB
}

func NewThresholdsStore(db *sql.DB) *ThresholdsStore {
	return &ThresholdsStore{
		db,
	}
}
