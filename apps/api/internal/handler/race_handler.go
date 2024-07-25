package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

func AddRace(c fiber.Ctx, raceStore *store.StoreStruct) error {
	var raceData types.RaceType

	if err := c.Bind().Body(raceData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
		})
	}

	success, err := raceStore.AddRace(raceData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if success {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"message": "Race added successfully",
			"race":    raceData,
		})
	}

	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": "Failed to add race",
	})
}
