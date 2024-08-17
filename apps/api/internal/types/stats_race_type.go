package types

import "time"

type StatsRaceType struct {
	Id        string    `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	RaceId    string    `json:"race_id"`
	VehicleId string    `json:"vehicle_id"`
	Distance  float32   `json:"distance"`
	SpeedAverage     float32   `json:"speed_average"`
	SpeedMax float32 `json:"speed_max"`
	BatteryMax int `json:"battery_max"`
	BatteryMin int `json:"battery_min"`
	Time      int `json:"time"`
	DateTech  time.Time `json:"date_tech"`
}



