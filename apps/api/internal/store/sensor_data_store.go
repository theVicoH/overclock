package store

import (
	"Overclock/internal/types"
	"time"

	"gorm.io/gorm"
)

func NewSenSorDataStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (s *Store) AddSensorData(sensorData types.SensorData) (bool, error) {
	if err := s.db.Create(&sensorData).Error; err != nil {
		return false, err
	}
	return true, nil
}

func (s *Store) GetSensorDataByRaceId(raceID string) ([]types.SensorData, error) {
	var sensorData []types.SensorData

	if err := s.db.Where("race_id = ?", raceID).Find(&sensorData).Error; err != nil {
		return nil, err
	}

	return sensorData, nil
}

func (s *Store) GetSpeedLastTenMin(raceId string) ([]types.SensorSpeed, error) {

	var res []types.SensorSpeed
	now := time.Now()
	past := now.Add(-10 * time.Minute)

	if err := s.db.Table("sensor_data").
		Select("speed, date_tech").
		Where("race_id = ?", raceId).
		Where("date_tech BETWEEN ? AND ?", past, now).
		Find(&res).Error; err != nil {
		return res, err
	}

	return res, nil
}

func (s *Store) GetConsumptionLastTenMin(raceId string) ([]types.SensorConsumption, error) {
	var res []types.SensorConsumption

	now := time.Now()
	past := now.Add(-10 * time.Minute)

	if err := s.db.Table("sensor_data").
		Select("consumption, date_tech").
		Where("race_id = ?", raceId).
		Where("date_tech BETWEEN ? AND ?", past, now).
		Find(&res).Error; err != nil {
		return res, err
	}

	return res, nil
}
