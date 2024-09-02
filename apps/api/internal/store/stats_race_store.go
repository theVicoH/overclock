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
	db := s.db.Table("stats_race").Create(&statsRace)

	if db.Error != nil {
		log.Println("db error => ", db.Error)
		return false, db.Error
	}

	return true, nil
}
