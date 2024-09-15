package types

import (
	"time"

	"github.com/google/uuid"
)

type RaceType struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	VehicleId uuid.UUID `json:"vehicle_id"`
	Name      string    `json:"name"`
	Date      time.Time `json:"date"`
}

type RacesResponse struct {
	Id           uuid.UUID `json:"id"`
	VehicleId    uuid.UUID `json:"vehicle_id"`
	Name         string    `json:"name"`
	Date         time.Time `json:"date"`
	Time         int64     `json:"time,omitempty"`
	SpeedAverage float64   `json:"speed_average,omitempty"`
	Distance     float64   `json:"distance,omitempty"`
	VehicleName  string    `json:"vehicle_name"`
	IsFinish     bool      `json:"is_finish"`
}

type RaceDetailsResponse struct {
	RaceData    Race               `json:"race_data"`
	VehicleName string             `json:"vehicle_name"`
	Stats       StatsRaceType      `json:"stats_race_data"`
	Sensor      SensorDataResponse `json:"sensor_data"`
}

type RaceUpdateType struct {
	VehicleId uuid.UUID `json:"vehicle_id"`
	Name      string    `json:"name"`
}

type RequestType struct {
	Data RaceUpdateType `json:"data"`
}

type RaceTestType struct {
	Data RaceType
}

type Race struct {
	Id        uuid.UUID     `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	VehicleId uuid.UUID     `json:"vehicle_id"`
	Name      string        `json:"name"`
	Date      time.Time     `json:"date"`
	Vehicle   VehicleType   `json:"vehicle"`
	Stats     StatsRaceType `json:"stats" gorm:"foreignKey:RaceId;references:Id"`
	Sensors   []SensorData  `json:"sensors" gorm:"foreignKey:RaceId;references:Id"`
}

func (Race) TableName() string {
	return "race"
}
