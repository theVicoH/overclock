package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"gorm.io/gorm"
)

func SeedStatsRace(db *gorm.DB, vehicleId string, raceIds []string) {
	statsRaces := []types.StatsRaceType{
		{RaceId: raceIds[0], VehicleId: vehicleId, Distance: 45, Time: time.Now(), DateTech: time.Now()},
		{RaceId: raceIds[1], VehicleId: vehicleId, Distance: 35, Time: time.Now(), DateTech: time.Now()},
		{RaceId: raceIds[2], VehicleId: vehicleId, Distance: 25, Time: time.Now(), DateTech: time.Now()},
	}

	for _, stats := range statsRaces {
		if err := db.Table("stats_race").Create(&stats).Error; err != nil {
			log.Fatalf("Error seeding stats_race: %v", err)
		}
	}
}
