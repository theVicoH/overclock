package router

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func HeadAngleRoute(app *fiber.App, headAngleHandler *handler.HeadAngleHandler) {
	app.Use("/v1/headAngle", func(c *fiber.Ctx) error { return websocket.New(headAngleHandler.RotateHead)(c) })
}
