package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"gorm.io/gorm"
)

func SeedRace(db *gorm.DB,vehicleId string) []string {
	var raceIds []string
	for _, race := range []types.RaceType{
		{Name: "Run 1", VehicleId: vehicleId, Date: time.Now()},
		{Name: "Run 2", VehicleId: vehicleId, Date: time.Now()},
		{Name: "Run 3", VehicleId: vehicleId, Date: time.Now()},
	} {
		if err := db.Table("race").Create(&race).Error; err != nil {
			log.Fatalf("Error seeding race: %v", err)
		}
		raceIds = append(raceIds, race.Id)
		log.Println("Insered races ID : ", race.Id)
	}
	return raceIds
}
