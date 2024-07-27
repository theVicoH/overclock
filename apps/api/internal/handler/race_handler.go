package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"strconv"

	"github.com/gofiber/fiber/v3"
)

func NewRaceHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddRace(c fiber.Ctx) error {
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Data successfully fetched",
	})
}

func (h *Handler) GetRaceById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    id,
	})
}

func (h *Handler) DeleteRaceById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": id,
	})
}

func (h *Handler) UpdateRaceById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var raceData types.RaceType
	if err := c.Bind().Body(raceData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
		})
	}

	// raceData.ID = id
	// success, err := raceStore.UpdateRaceById(raceData)
	// if err != nil || !success {
	// 	return c.SendStatus(fiber.StatusInternalServerError)
	// }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": id,
	})
}
