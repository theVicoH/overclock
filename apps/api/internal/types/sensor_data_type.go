package types

import (
	"time"

	"github.com/google/uuid"
)

type SensorData struct {
	Id       uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	RaceId   uuid.UUID `gorm:"type:uuid;not null"`
	Distance float64   `gorm:"type:float;not null"`
	Speed    float64   `gorm:"type:float;not null"`
	Date     time.Time `gorm:"type:timestamp;not null"`
	Battery  float64   `gorm:"type:float;not null"`
	Track    int       `gorm:"type:int;not null"`
}

type SensorDataResponse struct {
	Distance []float64   `json:"distance"`
	Speed    []float64   `json:"speed"`
	Battery  []float64   `json:"battery"`
	Track    []int       `json:"track"`
	Date     []time.Time `json:"date"`
}

func (SensorData) TableName() string {
	return "sensor_data"
}
