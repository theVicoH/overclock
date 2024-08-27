package database

import (
	"Overclock/internal/types"
	"log"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SeedSensor(db *gorm.DB, raceIds []uuid.UUID) {
	for _, sensor := range []types.SensorData{
		{RaceId: raceIds[0], Speed: 10, Distance: 100, Battery: 15, Track: 7, Date: time.Now()},
		{RaceId: raceIds[1], Speed: 10, Distance: 100, Battery: 15, Track: 7, Date: time.Now()},
		{RaceId: raceIds[2], Speed: 10, Distance: 100, Battery: 15, Track: 7, Date: time.Now()},
	} {
		if err := db.Table("sensor_data").Create(&sensor).Error; err != nil {
			log.Fatalf("Error seeding sensors: %v", err)
		}
	}
}
