package handler

import (
	// "Overclock/internal/model"

	"Overclock/internal/store"
	"Overclock/internal/types"
	"fmt"
	"math"
	"strconv"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/gofiber/fiber/v3"
)

func NewSenSorDataHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerMqtt {
	return &HandlerMqtt{
		store,
		client,
	}
}

var sensorDataMap = make(map[string]types.SensorData)

// Fonction pour accumuler et traiter les messages MQTT
func (h *HandlerMqtt) MessageCallback(message string, topic string) {
	fmt.Printf("Processing message: %s from topic: %s\n", message, topic)

	// Déterminer la RaceID
	raceID := sensorDataMap["race"].RaceID

	// Si RaceID n'est pas encore défini, attendre son arrivée
	if raceID == "" && topic != "esp32Bis/race" {
		fmt.Println("RaceID not set yet, waiting for RaceID")
		return
	}

	// Accumuler les données selon le topic
	switch topic {
	case "esp32Bis/race":
		raceID = message
		sensorDataMap["race"] = types.SensorData{RaceID: raceID}
	case "esp32Bis/speed":
		speed, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing speed value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Speed = float32(speed)
		sensorDataMap["race"] = data
	case "esp32Bis/distance":
		distance, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing distance value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Distance = float32(math.Round(distance))
		sensorDataMap["race"] = data
	case "esp32Bis/battery":
		consumption, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing consumption value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Consumption = float32(math.Round(consumption))
		sensorDataMap["race"] = data
	default:
		fmt.Printf("Unknown topic: %s\n", topic)
		return
	}

	// Vérifier si toutes les données essentielles sont présentes
	data := sensorDataMap["race"]
	if data.RaceID != "" && data.Speed != 0 && data.Distance != 0 && data.Consumption != 0 {
		// Ajouter la date actuelle
		data.DateTech = time.Now()

		// Insérer les données dans la base de données
		sensorStore := h.store.SensorModelStore
		success, err := sensorStore.AddSensorData(data)
		if err != nil {
			fmt.Printf("Failed to add sensor data: %v\n", err)
		} else {
			fmt.Printf("Sensor data added successfully: %v\n", success)
		}

		// Réinitialiser les données pour la prochaine course
		sensorDataMap = make(map[string]types.SensorData)
	}
}

func (h *HandlerMqtt) GetSensorDataById(c fiber.Ctx) error {
	race_id := c.Params("id")
	sensor, err := h.store.GetSensorDataByRaceId(race_id)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    sensor,
	})
}
