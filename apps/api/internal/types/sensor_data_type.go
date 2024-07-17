package types

import "time"

type SensorDataType struct {
	Id          int       `json:"id"`
	VehicleId   int       `json:"vehicle_id"`
	Speed       float32   `json:"speed"`
	Orientation float32   `json:"orientation"`
	DateTech    time.Time `json:"date_tech"`
}
