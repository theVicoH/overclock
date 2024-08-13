package handler

import (
	"Overclock/internal/store"
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
	//   // Lire les messages du broker MQTT
	//   test := ReadMessages(*h.client, "#")
	//   fmt.Println("Valeur reçue de ReadMessages:", test)
	//   // Vérifier si des données sont reçues
	//   if test == "" {
	// 	  // Si aucune donnée n'est reçue, retourner un statut d'erreur (par exemple, 404)
	// 	  return c.Status(fiber.StatusNotFound).SendString("No data received from broker")
	//   }

	//   // Retourner les données reçues en réponse HTTP
	//   return c.JSON(fiber.Map{
	// 	  "data": test,
	//   })
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
