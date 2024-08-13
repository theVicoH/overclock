package handler

import (
	"Overclock/internal/store"
	"fmt"
	"strconv"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/gofiber/fiber/v3"
)

func NewSenSorDataHandler(store *store.StoreStruct, client *MQTT.Client) *HandlerMqtt {
	return &HandlerMqtt{
		store,
		client,
	}
}

func MessageCallback(message string)  {
	fmt.Printf("Processing message: %s\n", message)
}

func (h *HandlerMqtt) AddSensorData(c fiber.Ctx) error {
	return nil
}

func (h *HandlerMqtt) GetSensorDataById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	sensor, err := h.store.GetSensorDataById(id)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    sensor,
	})
}

func (h *HandlerMqtt) DeleteSensorDataById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	sensor, err := h.store.DeleteSensorDataById(id)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    sensor,
	})
}

func (h *HandlerMqtt) UpdateSensorDataById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	sensor, err := h.store.UpdateSensorDataById(id)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    sensor,
	})
}
