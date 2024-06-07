package router

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func ControlRoutes(app *fiber.App, controlHandler *handler.ControlHandler) {
	app.Use("/v1/control/manual", func(c *fiber.Ctx) error { return websocket.New(controlHandler.ManualControl)(c) })
}
