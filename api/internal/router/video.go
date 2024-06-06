package router

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func VideoRoutes(app *fiber.App , videoHandler *handler.VideoVariableHandler){
	app.Use("/v1/video" , func(c *fiber.Ctx) error { return websocket.New(videoHandler.VideoVariable)(c)})
}