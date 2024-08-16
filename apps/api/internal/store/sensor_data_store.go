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

func (s *Store) GetSensorDataByRaceId(raceID string) ([]types.SensorData, error) {
	var sensorData []types.SensorData

	// Rechercher tous les enregistrements correspondant au race_id
	if err := s.db.Where("race_id = ?", raceID).Find(&sensorData).Error; err != nil {
		return nil, err
	}

	// Retourner la liste des enregistrements
	return sensorData, nil
}
