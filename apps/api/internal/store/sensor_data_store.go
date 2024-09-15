package store

import (
	"Overclock/internal/types"

	"github.com/google/uuid"
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

func (s *Store) GetSensorDataByRaceId(raceID uuid.UUID) ([]types.SensorData, error) {
	var sensorData []types.SensorData

	if err := s.db.Where("race_id = ?", raceID).Find(&sensorData).Error; err != nil {
		return nil, err
	}

	return sensorData, nil
}
