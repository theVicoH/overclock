package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"time"

	"github.com/gofiber/fiber/v3"
)

func NewRaceHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddRace(c fiber.Ctx) error {

	var requestData types.RequestType

	if err := c.Bind().Body(&requestData); err != nil {
		return err
	}

	raceData := types.RaceType{
		Name: requestData.Data.Name,
		Date: time.Now(),
	}

	success, err := h.store.AddRace(raceData)
	if err != nil || !success {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Race successfully added",
		"code":    fiber.StatusAccepted,
	})
}

func (h *Handler) GetRaceById(c fiber.Ctx) error {
	id := c.Params("id")
	success, err := h.store.GetRaceById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    success,
		"code":    fiber.StatusOK,
	})
}

func (h *Handler) DeleteRaceById(c fiber.Ctx) error {
	id := c.Params("id")
	success, err := h.store.DeleteRaceById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    success,
		"code":    fiber.StatusOK,
	})
}

func (h *Handler) UpdateRaceById(c fiber.Ctx) error {
	var requestData types.RequestType
	id := c.Params("id")

	if err := c.Bind().Body(&requestData); err != nil {
		return err
	}

	raceData := types.RaceType{
		Name: requestData.Data.Name,
		Date: time.Now(),
	}

	success, err := h.store.UpdateRaceById(id, raceData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": id,
		"data":    success,
		"code":    fiber.StatusOK,
	})
}

func (h *Handler) GetAllRace(c fiber.Ctx) error {
	return nil
}
