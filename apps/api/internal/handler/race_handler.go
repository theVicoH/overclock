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
		Name:      requestData.Data.Name,
		VehicleId: requestData.Data.VehicleId,
		Date:      time.Now(),
	}

	race, err := h.store.AddRace(raceData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error adding Race",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Race successfully added",
		"data":    race,
	})
}

func (h *Handler) GetRaceById(c fiber.Ctx) error {
	id := c.Params("id")
	race, err := h.store.GetRaceById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching race",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully fetched",
		"data":    race,
	})
}

func (h *Handler) DeleteRaceById(c fiber.Ctx) error {
	id := c.Params("id")
	race, err := h.store.DeleteRaceById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting race",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully deleted",
		"data":    race,
	})
}

func (h *Handler) UpdateRaceById(c fiber.Ctx) error {
	var requestData types.RequestType
	id := c.Params("id")

	if err := c.Bind().Body(&requestData); err != nil {
		return err
	}

	raceData := types.RaceType{
		Name:      requestData.Data.Name,
		VehicleId: requestData.Data.VehicleId,
		Date:      time.Now(),
	}

	race, err := h.store.UpdateRaceById(id, raceData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating race",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully updated",
		"data":    race,
	})
}

func (h *Handler) GetAllRace(c fiber.Ctx) error {

	race, err := h.store.GetAllRace()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching races",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully fetched",
		"data":    race,
	})
}

func (h *Handler) GetAllRacesWithData(c fiber.Ctx) error {
	races, err := h.store.GetAllRacesWithData()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching races",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully fetched",
		"data":    races,
	})
}
