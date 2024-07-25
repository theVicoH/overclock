package handler

import (
	"Overclock/internal/store"

	"github.com/gofiber/fiber/v3"
)

func GetSensorDataId(c fiber.Ctx, sensorStore *store.StoreStruct, id int) error {

	res, err := sensorStore.GetSensorDataById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data": fiber.Map{
				"error": err.Error(),
			},
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data successfully fetched",
		"data":    res,
	})

}
