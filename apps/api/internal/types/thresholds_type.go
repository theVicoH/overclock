package types

import "time"

type ThresholdsType struct {
	Id          int       `json:"id"`
	VehicleId   int       `json:"vehicle_id"`
	SpeedMax    float32   `json:"speed_max"`
	SpeedMin    float32   `json:"speed_min"`
	DistanceMax float32   `json:"distance_max"`
	DistanceMin float32   `json:"distance_min"`
	DateTech    time.Time `json:"date_tech"`
}
