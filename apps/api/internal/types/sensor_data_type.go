package types

import "time"

type SensorData struct {
	Id          string    `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	RaceID      string    `json:"race_id"`
	Distance    float32   `json:"distance"`
	Speed       float32   `json:"speed"`
	Battery     float32   `json:"battery"`
	Track       float32     `json:"track"`
	Date        time.Time     `json:"date"`
}

type Orientation struct {
	X string
	Y string
}

type SensorSpeed struct {
	Speed    float32
	DateTech time.Time
}

type SensorConsumption struct {
	Consumption float32
	DateTech    time.Time
}
