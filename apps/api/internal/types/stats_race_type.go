package types

import "time"

type StatsRaceType struct {
	Id        string    `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	RaceId    string    `json:"race_id"`
	VehicleId string    `json:"vehicle_id"`
	Distance  float32   `json:"distance"`
	Time      time.Time `json:"time"`
	DateTech  time.Time `json:"date_tech"`
}
