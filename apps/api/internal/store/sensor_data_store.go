package store

import (
	"Overclock/internal/types"

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

func (s *Store) GetSensorDataById(id int) (types.SensorData, error) {
	var sensorData types.SensorData

	return sensorData, nil
}

func (s *Store) DeleteSensorDataById(id int) (bool, error) {

	return false, nil
}

func (s *Store) UpdateSensorDataById(id int) (types.SensorData, error) {
	var sensorData types.SensorData

	return sensorData, nil
}
