package handler

import (
	"Overclock/internal/store"
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/gofiber/fiber/v3"
)

func NewStatsRaceHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerMqtt {
	return &HandlerMqtt{
		store,
		client,
	}
}

func (h *HandlerMqtt) AddStatsRace(c fiber.Ctx) error {
	var test = ReadMessages(*h.client, "esp32/sensor")
	fmt.Println("je suis le test" , test)
	return nil
}

func (h *HandlerMqtt) GetStatsRaceById(c fiber.Ctx) error {
	return nil
}

func (h *HandlerMqtt) DeleteStatsRaceById(c fiber.Ctx) error {
	return nil
}

func (h *HandlerMqtt) UpdateStatsRaceById(c fiber.Ctx) error {
	return nil
}
