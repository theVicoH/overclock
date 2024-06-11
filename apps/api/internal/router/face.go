package router

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func FaceRoutes(app *fiber.App, faceHandler *handler.FaceHandler) {
	app.Use("/v1/face/set", func(c *fiber.Ctx) error { return websocket.New(faceHandler.ChangeFace)(c) })
	app.Use("/v1/headAngle", func(c *fiber.Ctx) error { return websocket.New(faceHandler.RotateHead)(c) })
}
