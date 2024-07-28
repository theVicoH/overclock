package database

import (
	"Overclock/internal/types"
	"log"

	"gorm.io/gorm"
)

func SeedVehicle(db *gorm.DB) string {
	var vehicleId string
	vehicles := []types.VehicleType{
		{Name: "Overclock"},
	}

	for _, vehicle := range vehicles {
		if err := db.Table("vehicle").Create(&vehicle).Error; err != nil {
			log.Fatalf("Error seeding vehicle: %v", err)
		}
		vehicleId = vehicle.Id
		log.Println("Inserted Vehicle ID:", vehicle.Id)
	}
	return vehicleId
}
