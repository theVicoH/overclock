package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"gorm.io/gorm"
)

func SeedStatsRace(db *gorm.DB, vehicleId string, raceIds []string) {
	for _, stats := range []types.StatsRaceType{
		{RaceId: raceIds[0], VehicleId: vehicleId, Distance: 45, Speed: 30, Time: time.Now(), DateTech: time.Now()},
		{RaceId: raceIds[1], VehicleId: vehicleId, Distance: 35,Speed: 30, Time: time.Now(), DateTech: time.Now()},
		{RaceId: raceIds[2], VehicleId: vehicleId, Distance: 25, Speed: 30 , Time: time.Now(), DateTech: time.Now()},
	} {
		if err := db.Table("stats_race").Create(&stats).Error; err != nil {
			log.Fatalf("Error seeding stats_race: %v", err)
		}
	}
}
