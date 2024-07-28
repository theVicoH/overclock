package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"gorm.io/gorm"
)

func SeedSensor(db *gorm.DB, vehicleId string, raceIds []string) {

	sensors := []types.SensorDataType{
		{RaceID: raceIds[0], VehicleId: vehicleId, Speed: 10, Orientation: types.Orientation{X: "15", Y: "5"}, Consumption: 15, DateTech: time.Now()},
		{RaceID: raceIds[1], VehicleId: vehicleId, Speed: 10, Orientation: types.Orientation{X: "15", Y: "5"}, Consumption: 15, DateTech: time.Now()},
		{RaceID: raceIds[2], VehicleId: vehicleId, Speed: 10, Orientation: types.Orientation{X: "15", Y: "5"}, Consumption: 15, DateTech: time.Now()},
	}

	for _, sensor := range sensors {
		if err := db.Table("sensor_data").Create(&sensor).Error; err != nil {
			log.Fatalf("Error seeding sensors: %v", err)
		}
	}
}
