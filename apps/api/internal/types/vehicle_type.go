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

type VehicleWithRacesDetailType struct {
	ID    string           `json:"id"`
	Name  string           `json:"name"`
	Races []RaceDetailType `json:"races" gorm:"-"`
}

type RaceDetailType struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Date         time.Time `json:"date"`
	Time         int       `json:"time"`
	SpeedAverage float64   `json:"speed_average"`
	Distance     float64   `json:"distance"`
}

type VehicleStatsDetailType struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	MaxSpeed    float64 `json:"max_speed"`
	MaxDistance float64 `json:"max_distance"`
	MinTime     int     `json:"min_time"`
}

type VehiculeClassementBySpeedMax struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	MaxSpeed float32 `json:"max_speed"`
}
