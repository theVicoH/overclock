package sensor_router

import (
	"Overclock/internal/handler"
	"Overclock/internal/store"
	"strconv"

	"github.com/gofiber/fiber/v3"
)

func SetUpSensorRoute(route fiber.Router, myStore *store.StoreStruct) {

	route.Post("/:id", func(c fiber.Ctx) error {
		carteIdStr := c.Params("id")
		carteId, err := strconv.Atoi(carteIdStr)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error":   "Invalid id",
				"success": false,
			})
		}

		return handler.GetSensorDataId(c, myStore, carteId)
	})

}
