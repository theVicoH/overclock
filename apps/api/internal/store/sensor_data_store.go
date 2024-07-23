package store

import (
	"Overclock/internal/types"
	"database/sql"
)

type SensorStore struct {
	*sql.DB
}

func NewSenSorDataStore(db *sql.DB) *SensorStore {
	return &SensorStore{
		db,
	}
}

func (s *SensorStore) AddSensorData(sensorData types.SensorDataType) (bool, error) {

	return false, nil
}

func (s *SensorStore) GetSensorDataById(id int) (types.SensorDataType, error) {
	var sensorData types.SensorDataType

	return sensorData, nil
}

func (s *SensorStore) DeleteSensorDataById(id int) (bool, error) {

	return false, nil
}

func (s *SensorStore) UpdateSensorDataById(id int) (types.SensorDataType, error) {
	var sensorData types.SensorDataType

	return sensorData, nil
}
