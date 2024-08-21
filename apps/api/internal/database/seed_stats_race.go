package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"gorm.io/gorm"
)

func SeedStatsRace(db *gorm.DB, vehicleId string, raceIds []string) {
	for _, stats := range []types.StatsRaceType{
		{RaceId: raceIds[0], VehicleId: vehicleId, Distance: 45, Time: 60, DateTech: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
		{RaceId: raceIds[1], VehicleId: vehicleId, Distance: 35, Time: 60, DateTech: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
		{RaceId: raceIds[2], VehicleId: vehicleId, Distance: 25, Time: 60, DateTech: time.Now(), BatteryMax: 90, BatteryMin: 85, SpeedAverage: 17, SpeedMax: 25},
	} {
		if err := db.Table("stats_race").Create(&stats).Error; err != nil {
			log.Fatalf("Error seeding stats_race: %v", err)
		}
	}
}
