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
	return false, nil
}

func (t *ThresholdsStore) GetThresholdsById(id int) (types.ThresholdsType, error) {
	var thresholds types.ThresholdsType

	return thresholds, nil
}

func (t *ThresholdsStore) DeleteThresholdsById(id int) (bool, error) {
	return false, nil
}

func (t *ThresholdsStore) UpdateThresholdsById(id int) (types.ThresholdsType, error) {
	var thresholds types.ThresholdsType

	return thresholds, nil
}
