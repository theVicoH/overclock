package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	host     = os.Getenv("DB_HOST")
	port     = os.Getenv("DB_PORT")
	dbuser   = os.Getenv("DB_USER")
	password = os.Getenv("DB_PASSWORD")
	dbname   = os.Getenv("DB_NAME")
)

func InitDb() *gorm.DB {
	conninfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, dbuser, password, dbname)
	conn, err := gorm.Open(postgres.Open(conninfo), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("err : ", err)
	}

	// vehicleIds := SeedVehicle(conn)
	// raceIds := SeedRace(conn, vehicleIds)
	// SeedSensor(conn, raceIds)
	// SeedStatsRace(conn, vehicleIds, raceIds)

	return conn
}
