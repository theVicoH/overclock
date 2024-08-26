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

func (s *Store) AddRace(race types.RaceType) (types.RaceType, error) {
	var raceData types.RaceType
	raceData.Date = time.Now()
	raceData.VehicleId = race.VehicleId
	raceData.Name = race.Name

	if err := s.db.Table("race").Create(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) GetRaceById(id string) (types.RaceType, error) {
	var raceData types.RaceType
	if err := s.db.Table("race").Where("id = ?", id).First(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) DeleteRaceById(id string) (bool, error) {
	if err := s.db.Table("race").Where("id = ?", id).Delete(&types.RaceType{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

func (s *Store) UpdateRaceById(id string, updatedData types.RaceType) (types.RaceType, error) {
	var raceData types.RaceType
	if err := s.db.Table("race").Where("id = ?", id).First(&raceData).Error; err != nil {
		return raceData, err
	}

	raceData.Name = updatedData.Name
	raceData.VehicleId = updatedData.VehicleId
	raceData.Date = time.Now()

	if err := s.db.Table("race").Save(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) GetAllRace() ([]types.RaceType, error) {
	var raceData []types.RaceType
	if err := s.db.Table("race").Find(&raceData).Error; err != nil {
		return nil, err
	}
	return raceData, nil
}

func (s *Store) GetAllRacesWithData() ([]types.RaceResponse, error) {
	var raceData []types.RaceResponse

	if err := s.db.Table("race").
		Select("race.*, stats_race.time, stats_race.speed_average, stats_race.distance, stats_race.id IS NOT NULL AS is_finish, vehicle.name AS vehicle_name").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Joins("LEFT JOIN vehicle ON vehicle.id = race.vehicle_id").
		Scan(&raceData).Error; err != nil {
		return nil, err
	}

	return raceData, nil
}
