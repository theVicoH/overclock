package types

import (
	"time"

	"github.com/google/uuid"
)

type StatsRaceType struct {
	Id           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	RaceId       uuid.UUID `gorm:"type:uuid;not null"`
	Distance     float64   `gorm:"type:float;not null"`
	SpeedMax     float64   `gorm:"type:float;not null"`
	SpeedAverage float64   `gorm:"type:float;not null"`
	BatteryMax   int       `gorm:"type:int;not null"`
	BatteryMin   int       `gorm:"type:int;not null"`
	Time         int       `gorm:"type:bigint;not null"`
	Date         time.Time `gorm:"type:timestamp;not null"`
}

func (StatsRaceType) TableName() string {
	return "stats_race"
}
