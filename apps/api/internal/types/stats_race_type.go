package types

import "time"

type StatsRaceType struct {
	Id          int       `json:"id"`
	VehicleId   int       `json:"vehicle_id"`
	Distance    float32   `json:"distance"`
	Time        time.Time `json:"time"`
	Performance float32   `json:"performance"`
	DateTech    time.Time `json:"date_tech"`
}
