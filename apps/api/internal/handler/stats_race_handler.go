package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"fmt"
	"sync"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

func NewStatsRaceHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerMqtt {
	return &HandlerMqtt{
		store,
		client,
	}
}

func (h *HandlerMqtt) AddStatsRace(c fiber.Ctx) error {
	idStr := c.Params("id")

	id, err := uuid.Parse(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid UUID format",
		})
	}

	var wg sync.WaitGroup
	var sonsorData []types.SensorData
	var sensorErr error

	wg.Add(1)
	go func() {
		defer wg.Done()
		sonsorData, sensorErr = h.store.GetSensorDataByRaceId(id)
	}()
	wg.Wait()

	if sensorErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":  fiber.StatusInternalServerError,
			"error": sensorErr,
		})
	}

	current_distance := 0
	speed_total := 0
	speed_max := 0
	battery_max := 0
	battery_min := 0
	time_min := int64(0)
	time_max := int64(0)

	for i := 0; i < len(sonsorData); i++ {
		speed_total = speed_total + int(sonsorData[i].Speed)

		if sonsorData[i].Speed > float64(speed_max) {
			speed_max = int(sonsorData[i].Speed)
		}

		if sonsorData[i].Distance > float64(current_distance) {
			current_distance = int(sonsorData[i].Distance)
		}

		if time_max == 0 && time_min == 0 {
			time_max = sonsorData[i].Date.Unix()
			time_min = sonsorData[i].Date.Unix()
		} else {
			if sonsorData[i].Date.Unix() > time_max {
				time_max = sonsorData[i].Date.Unix()
			}
			if sonsorData[i].Date.Unix() < time_min {
				time_min = sonsorData[i].Date.Unix()
			}
		}
		if battery_max == 0 && battery_min == 0 {
			battery_max = int(sonsorData[i].Battery)
			battery_min = int(sonsorData[i].Battery)
		} else {
			if sonsorData[i].Battery > float64(battery_max) {
				battery_max = int(sonsorData[i].Battery)
			}
			if sonsorData[i].Battery < float64(battery_min) {
				battery_min = int(sonsorData[i].Battery)
			}
		}
	}
	fmt.Println(len(sonsorData))
	speed_average := speed_total / len(sonsorData)
	time_delta := time_max - time_min

	stats := types.StatsRaceType{
		RaceId:       id,
		Distance:     float64(current_distance),
		SpeedAverage: float64(speed_average),
		SpeedMax:     float64(speed_max),
		BatteryMax:   battery_max,
		BatteryMin:   battery_min,
		Time:         int(time_delta),
		Date:         time.Now(),
	}

	_, err = h.store.AddStatsRace(stats)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error adding StatsRace",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race stats created",
	})
}
