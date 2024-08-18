package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"fmt"
	"sync"
	"time"

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
	id := c.Params("id")

	var wg sync.WaitGroup
	var race types.RaceType
	var success []types.SensorData
	var raceErr, sensorErr error

	wg.Add(1)
	go func() {
		defer wg.Done()
		race, raceErr = h.store.GetRaceById(id)
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		success, sensorErr = h.store.GetSensorDataByRaceId(id)
	}()
	wg.Wait()

	if raceErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":  fiber.StatusInternalServerError,
			"error": raceErr,
		})
	}

	if sensorErr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":  fiber.StatusInternalServerError,
			"error": sensorErr,
		})
	}

	vehicule_id := race.VehicleId	

	current_distance := 0
	speed_total := 0
	speed_max := 0
	battery_max := 0
	battery_min := 0
	time_min := int64(0)
	time_max := int64(0)

	for i := 0; i < len(success); i++ {
		speed_total = speed_total + int(success[i].Speed)

		if(success[i].Speed > float32(speed_max)){
			speed_max = int(success[i].Speed)
		}

		if success[i].Distance > float32(current_distance){
			current_distance = int(success[i].Distance)
		}

		if time_max == 0 && time_min == 0 {
			time_max = success[i].DateTech.Unix()
			time_min = success[i].DateTech.Unix()
		}else{
			if success[i].DateTech.Unix() > time_max {
				time_max = success[i].DateTech.Unix()
			}
			if success[i].DateTech.Unix() < time_min {
				time_min = success[i].DateTech.Unix()
			}
		}
		if(battery_max == 0 && battery_min == 0){
			battery_max = int(success[i].Consumption)
			battery_min = int(success[i].Consumption)
		}else{
			if success[i].Consumption > float32(battery_max) {
				battery_max = int(success[i].Consumption)
			}
			if success[i].Consumption < float32(battery_min){
				battery_min = int(success[i].Consumption)
			}
		}
	}
	fmt.Println(len(success))
	speed_average := speed_total / len(success)
	time_delta := time_max - time_min

	stats := types.StatsRaceType{
		RaceId: id,
		VehicleId: vehicule_id,
		Distance: float32(current_distance),
		SpeedAverage: float32(speed_average),
		SpeedMax: float32(speed_max),
		BatteryMax: battery_max,
		BatteryMin: battery_min,
		Time: int(time_delta),
		DateTech: time.Now(),
	}
	
	_, err := h.store.AddStatsRace(stats)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code" : fiber.StatusInternalServerError,
			"error" : err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code" : fiber.StatusOK,
		"message" : "Race stats created",
	})
}

func (h *HandlerMqtt) GetStatsRaceById(c fiber.Ctx) error {

	id := c.Params("id")

	success, err := h.store.GetStatsRaceById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code":  fiber.StatusInternalServerError,
			"error": err,
		})
	}

 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code" : fiber.StatusOK,
		"data" : success,
	})
}

func (h *HandlerMqtt) DeleteStatsRaceById(c fiber.Ctx) error {
	id := c.Params("id")

	_, err := h.store.DeleteStatsRaceById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"code" : fiber.StatusInternalServerError,
			"error" : err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"code" : fiber.StatusInternalServerError,
		"message" : "Race deleted",
	})
}

func (h *HandlerMqtt) UpdateStatsRaceById(c fiber.Ctx) error {
	return nil
}
