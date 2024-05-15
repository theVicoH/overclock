package router

import (
	"Vroom/internal/handler"

	"github.com/gofiber/fiber/v2"
)

func ControlRoutes(app *fiber.App, controlHandler *handler.ControlHandler) {
	v1Group := app.Group("/v1")
	controlV1Group := v1Group.Group("/control")
	controlV1Group.Get("/", controlHandler.ManualControl)
}
