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
		vehicleCopy := vehicle
		if err := db.Table("vehicle").Create(&vehicleCopy).Error; err != nil {
			log.Fatalf("Error seeding vehicle: %v", err)
		}
		vehicleId = vehicleCopy.Id
		log.Println("Inserted Vehicle ID:", vehicleCopy.Id)
	}
	return vehicleId
}
