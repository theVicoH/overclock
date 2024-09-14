package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
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

func (h *Handler) GetRaceDetailsById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid UUID format",
		})
	}

	raceDetails, err := h.store.GetRaceDetailsByID(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching race",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Race successfully fetched",
		"data": fiber.Map{
			"race_data": fiber.Map{
				"id":           raceDetails.RaceData.Id,
				"name":         raceDetails.RaceData.Name,
				"date":         raceDetails.RaceData.Date,
				"vehicle_name": raceDetails.VehicleName,
			},
			"stats":  raceDetails.Stats,
			"sensor": raceDetails.Sensor,
		},
	})
}
