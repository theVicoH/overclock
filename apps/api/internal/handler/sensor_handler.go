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
	"github.com/google/uuid"
)

func NewSenSorDataHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerMqtt {
	return &HandlerMqtt{
		store,
		client,
	}
}

var sensorDataMap = make(map[string]types.SensorData)

func (h *HandlerMqtt) MessageCallback(message string, topic string) {
	fmt.Printf("Processing message: %s from topic: %s\n", message, topic)

	raceId := sensorDataMap["race"].RaceId

	if raceId == uuid.Nil && topic != "esp32Bis/race" {
		fmt.Println("RaceID not set yet, waiting for RaceID")
		return
	}

	switch topic {
	case "esp32Bis/race":
		raceId, _ = uuid.Parse(message)
		sensorDataMap["race"] = types.SensorData{RaceId: raceId}
	case "esp32Bis/speed":
		speed, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing speed value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Speed = float64(speed)
		sensorDataMap["race"] = data
	case "esp32Bis/distance":
		distance, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing distance value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Distance = float64(math.Round(distance))
		sensorDataMap["race"] = data
	case "esp32Bis/battery":
		Battery, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing Battery value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Battery = float64(math.Round(Battery))
		sensorDataMap["race"] = data
	case "esp32Bis/track":
		Track, err := strconv.ParseFloat(message, 32)
		if err != nil {
			fmt.Printf("Error parsing Track value: %v\n", err)
			return
		}
		data := sensorDataMap["race"]
		data.Battery = float64(math.Round(Track))
		sensorDataMap["race"] = data

	default:
		fmt.Printf("Unknown topic: %s\n", topic)
		return
	}

	data := sensorDataMap["race"]
	if data.RaceId != uuid.Nil && data.Speed != 0 && data.Distance != 0 && data.Battery != 0 {
		data.Date = time.Now()

		sensorStore := h.store.SensorModelStore
		success, err := sensorStore.AddSensorData(data)
		if err != nil {
			fmt.Printf("Failed to add sensor data: %v\n", err)
		} else {
			fmt.Printf("Sensor data added successfully: %v\n", success)
		}

		sensorDataMap = make(map[string]types.SensorData)
	}
}

func (h *HandlerMqtt) GetSensorDataById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid UUID format",
		})
	}
	sensor, err := h.store.GetSensorDataByRaceId(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching Sensor Datas",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "SensorData successfully updated",
		"data":    sensor,
	})
}

func (h *HandlerMqtt) GetSpeedLastTenMin(c fiber.Ctx) error {
	race_id := c.Params("id")

	sensor, err := h.store.GetSpeedLastTenMin(race_id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching speed for the last ten minutes",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Speed for the last ten minutes successfulyy fetched",
		"data":    sensor,
	})
}

func (h HandlerMqtt) GetConsumptionLastTenMin(c fiber.Ctx) error {
	race_id := c.Params("id")

	sensor, err := h.store.GetConsumptionLastTenMin(race_id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching consumption for the last ten minutes",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Consumption for the last ten minutes successfulyy fetched",
		"data":    sensor,
	})
}
