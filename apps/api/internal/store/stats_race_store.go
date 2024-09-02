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

func (s *Store) GetStatsRaceByVehiculeId(id string) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	db := s.db.Table("stats_race").Where("vehicule_id = ?", id).First(&statsRace)
	if db.Error != nil {
		log.Println("db error => ", db.Error)
	}

	return statsRace, nil
}

func (s *Store) GetStatsRaceById(id string) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	db := s.db.Table("stats_race").Where("race_id = ?", id).First(&statsRace)
	if db.Error != nil {
		log.Println("db error => ", db.Error)
	}

	return statsRace, nil
}

func (s *Store) DeleteStatsRaceById(id string) (types.StatsRaceType, error) {

	var statsRace types.StatsRaceType

	db := s.db.Table("stats_race").Where("race_id = ?", id).Delete(&statsRace)
	if db.Error != nil {
		log.Println("db error => ", db.Error)
		return statsRace, db.Error
	}

	return statsRace, nil
}

/*func (s *Store) UpdateStatsRaceById(id string) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	return statsRace, nil
}*/
