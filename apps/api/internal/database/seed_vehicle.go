package database

import (
	"Overclock/internal/types"
	"log"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SeedVehicle(db *gorm.DB) uuid.UUID {
	var vehicleId uuid.UUID
	for _, vehicle := range []types.VehicleType{
		{Name: "Overclock"},
	} {
		if err := db.Table("vehicle").Create(&vehicle).Error; err != nil {
			log.Fatalf("Error seeding vehicle: %v", err)
		}
		vehicleId = vehicle.Id
		log.Println("Inserted Vehicle ID:", vehicle.Id)
	}
	return vehicleId
}
