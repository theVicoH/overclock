package handler

import (
	"Overclock/internal/store"
	"strconv"

	"github.com/gofiber/fiber/v3"
)

func NewSenSorDataHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddSensorData(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	// pb de type exemple id ne peux pas être envoyé ici
	// sensor, err := h.store.AddSensorData(id)

	// if err != nil {
	// 	return c.SendStatus(fiber.StatusInternalServerError)
	// }
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    id,
	})
}

func (h *Handler) GetSensorDataById(c fiber.Ctx) error {
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

func (h *Handler) DeleteSensorDataById(c fiber.Ctx) error {
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

func (h *Handler) UpdateSensorDataById(c fiber.Ctx) error {
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
