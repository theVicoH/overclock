package store

import (
	"Overclock/internal/types"
	"log"

	"gorm.io/gorm"
)

func NewStatsRaceStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (s *Store) AddStatsRace(statsRace types.StatsRaceType) (bool, error) {

	return false, nil
}

func (s *Store) GetStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	db := s.db.Table("users").Where("id = ?", 1).First(&statsRace)
	if db.Error != nil {
		log.Println("db error => ", db.Error)
	}

	return statsRace, nil
}

func (s *Store) DeleteStatsRaceById(id int) (bool, error) {

	return false, nil
}

func (s *Store) UpdateStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	return statsRace, nil
}
