package routes

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v3"
)

func SetRoute(app *fiber.App, handler *handler.HandlerStruct) {
	sensorGroup := app.Group("/sensor")
	sensorGroup.Get("/:id", handler.GetSensorDataById)
	sensorGroup.Post("/", handler.AddSensorData)
	sensorGroup.Put("/:id", handler.UpdateSensorDataById)
	sensorGroup.Delete("/:id", handler.DeleteSensorDataById)
}
