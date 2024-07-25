package store

import (
	"Overclock/internal/types"

	"gorm.io/gorm"
)

func NewThresholdsStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (t *Store) AddThresholds(thresholds types.ThresholdsType) (bool, error) {
	return false, nil
}

func (t *Store) GetThresholdsById(id int) (types.ThresholdsType, error) {
	var thresholds types.ThresholdsType

	return thresholds, nil
}

func (t *Store) DeleteThresholdsById(id int) (bool, error) {
	return false, nil
}

func (t *Store) UpdateThresholdsById(id int) (types.ThresholdsType, error) {
	var thresholds types.ThresholdsType

	return thresholds, nil
}
