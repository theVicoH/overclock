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
	return true, nil
}
