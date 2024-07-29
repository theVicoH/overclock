package store

import (
	"Overclock/internal/types"
	"log"

	"gorm.io/gorm"
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func NewStatsRaceStore(db *gorm.DB, client *MQTT.Client) *StoreMqtt {
	return &StoreMqtt{
		db,
		client,
	}
}

func (s *StoreMqtt) AddStatsRace(statsRace types.StatsRaceType) (bool, error) {
	SendMessage(*s.client, "esp32/sensor", "test")
	return false, nil
}

func (s *StoreMqtt) GetStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	db := s.db.Table("users").Where("id = ?", 1).First(&statsRace)
	if db.Error != nil {
		log.Println("db error => ", db.Error)
	}

	return statsRace, nil
}

func (s *StoreMqtt) DeleteStatsRaceById(id int) (bool, error) {

	return false, nil
}

func (s *StoreMqtt) UpdateStatsRaceById(id int) (types.StatsRaceType, error) {
	var statsRace types.StatsRaceType

	return statsRace, nil
}
