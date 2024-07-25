package store

import (
	"Overclock/internal/types"
	"time"

	"gorm.io/gorm"
)

func NewRaceStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (s *Store) AddRace(raceData types.RaceType) (bool, error) {
	raceData.Date = time.Now()
	if err := s.db.Create(&raceData).Error; err != nil {
		return false, err
	}
	return true, nil
}

func (s *Store) GetRaceById(id int) (types.RaceType, error) {
	var raceData types.RaceType

	return raceData, nil
}

func (s *Store) DeleteRaceById(id int) (bool, error) {

	return false, nil
}

func (s *Store) UpdateRaceById(id int) (types.RaceType, error) {
	var raceData types.RaceType

	return raceData, nil
}
