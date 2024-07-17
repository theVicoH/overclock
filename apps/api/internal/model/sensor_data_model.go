package model

import "Overclock/internal/types"

type SensorModelInterface interface {
	AddSensorData(sensorData types.SensorDataType) (bool, error)
}
