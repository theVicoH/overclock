package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	host     = "database"
	port     = "5432"
	dbuser   = "root"
	password = "root"
	dbname   = "pgs"
)

func InitDb() *gorm.DB {
	conninfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, dbuser, password, dbname)
	conn, err := gorm.Open(postgres.Open(conninfo), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("err : ", err)
	}

	vehicleIds := SeedVehicle(conn)
	raceIds := SeedRace(conn, vehicleIds)
	SeedSensor(conn, raceIds)
	SeedStatsRace(conn, vehicleIds, raceIds)

	return conn
}
