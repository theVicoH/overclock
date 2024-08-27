package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SeedStatsRace(db *gorm.DB, vehicleId uuid.UUID, raceIds []uuid.UUID) {
	for _, stats := range []types.StatsRaceType{
		{RaceId: raceIds[0], Distance: 45, Time: 60, Date: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
		{RaceId: raceIds[1], Distance: 35, Time: 60, Date: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
		{RaceId: raceIds[2], Distance: 25, Time: 60, Date: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
	} {
		if err := db.Table("stats_race").Create(&stats).Error; err != nil {
			log.Fatalf("Error seeding stats_race: %v", err)
		}
	}
}
