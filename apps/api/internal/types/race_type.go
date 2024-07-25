package types

import "time"

type RaceType struct {
	Id   int       `json:"id"`
	Name string    `json:"name"`
	Date time.Time `json:"date"`
}
