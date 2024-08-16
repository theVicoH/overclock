package types

import "time"

type RaceType struct {
	Id   string    `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	VehicleId   string      `json:"vehicle_id"`
	Name string    `json:"name"`
	Date time.Time `json:"date"`
}

type RaceNameType struct {
	Name string `json:"name"`
}

type RaceUpdateType struct {
	Name string `json:"name"`
}

type RequestType struct {
	Data RaceUpdateType `json:"data"`
}
