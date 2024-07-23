package model

import "Overclock/internal/types"

type SensorModelInterface interface {
	AddSensorData(sensorData types.SensorDataType) (bool, error)
	GetSensorDataById(id int) (types.SensorDataType, error)
	DeleteSensorDataById(id int) (bool, error)
	UpdateSensorDataById(id int) (types.SensorDataType, error)
}
