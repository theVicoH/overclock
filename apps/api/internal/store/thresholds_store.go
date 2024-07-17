package store

import (
	"Overclock/internal/types"
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

func (t *ThresholdsStore) AddThresholds(thresholds types.ThresholdsType) (bool, error) {
	return true, nil
}
