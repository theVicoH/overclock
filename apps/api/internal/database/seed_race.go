package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SeedRace(db *gorm.DB, vehicleId uuid.UUID) []uuid.UUID {
	var raceIds []uuid.UUID
	for _, race := range []types.RaceType{
		{Name: "Run 1", VehicleId: vehicleId, Date: time.Now()},
		{Name: "Run 2", VehicleId: vehicleId, Date: time.Now()},
		{Name: "Run 3", VehicleId: vehicleId, Date: time.Now()},
	} {
		raceCopy := race
		if err := db.Table("race").Create(&raceCopy).Error; err != nil {
			log.Fatalf("Error seeding race: %v", err)
		}
		raceIds = append(raceIds, raceCopy.Id)
		log.Println("Inserted race ID: ", raceCopy.Id)
	}
	return raceIds
}
