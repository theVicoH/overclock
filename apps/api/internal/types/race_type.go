package types

import (
	"time"

	"github.com/google/uuid"
)

type RaceType struct {
	Id        string    `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	VehicleId string    `json:"vehicle_id"`
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
}

type RaceResponse struct {
	ID           uuid.UUID `json:"id"`
	VehicleID    uuid.UUID `json:"vehicle_id"`
	Name         string    `json:"name"`
	Date         time.Time `json:"date"`
	Time         int64     `json:"time,omitempty"`
	SpeedAverage float64   `json:"speed_average,omitempty"`
	Distance     float64   `json:"distance,omitempty"`
	VehicleName  string    `json:"vehicle_name"`
	IsFinish     bool      `json:"is_finish"`
}

type RaceNameType struct {
	VehicleId string `json:"vehicle_id"`
	Name      string `json:"name"`
}

type RaceUpdateType struct {
	VehicleId string `json:"vehicle_id"`
	Name      string `json:"name"`
}

type RequestType struct {
	Data RaceUpdateType `json:"data"`
}
