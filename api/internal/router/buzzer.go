package router

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func BuzzerRoutes(app *fiber.App, buzzerHandler *handler.BuzzerHandler){
	app.Use("/v1/buzzer/variable", func(c *fiber.Ctx) error { return websocket.New(buzzerHandler.BuzzerVariableControl)(c) })
}