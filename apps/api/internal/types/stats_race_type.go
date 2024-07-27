package types

import "time"

type StatsRaceType struct {
	Id        int       `json:"id"`
	RaceId    int       `json:"race_id"`
	VehicleId int       `json:"vehicle_id"`
	Distance  float32   `json:"distance"`
	Time      time.Time `json:"time"`
	DateTech  time.Time `json:"date_tech"`
}
