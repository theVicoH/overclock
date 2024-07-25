package routes

import (
	sensor_routes "Overclock/internal/routes/sensor_data"
	"Overclock/internal/store"

	"github.com/gofiber/fiber/v3"
)

func SetRoute(app *fiber.App, myStore *store.StoreStruct) {

	api := app.Group("/api")

	sensorGroup := api.Group("/sensor")
	sensor_routes.SetUpSensorRoute(sensorGroup, myStore)
}
