package types

import "time"

type SensorDataType struct {
	Id          int       `json:"id"`
	RaceID      int       `json:"race_id"`
	VehicleId   int       `json:"vehicle_id"`
	Speed       float32   `json:"speed"`
	Orientation float32   `json:"orientation"`
	Consumption float32   `json:"consumption"`
	DateTech    time.Time `json:"date_tech"`
}
