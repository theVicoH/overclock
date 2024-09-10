package types

import (
	"time"

	"github.com/google/uuid"
)

type VehicleType struct {
	Id   uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	Name string    `json:"name"`
}

type RequestTypeVehicle struct {
	Data VehicleUpdateType
}

type VehicleUpdateType struct {
	Name string `json:"name"`
}

func (VehicleType) TableName() string {
	return "vehicle"
}

type VehicleByRacesDetailType struct {
	Id           uuid.UUID `json:"id"`
	Name         string    `json:"name"`
	Date         time.Time `json:"date"`
	Time         int64     `json:"time,omitempty"`
	SpeedAverage float64   `json:"speed_average,omitempty"`
	Distance     float64   `json:"distance,omitempty"`
}
