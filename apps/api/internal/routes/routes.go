package routes

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v3"
	// "github.com/gofiber/websocket/v2"
	// "github.com/gofiber/websocket"
)

func SetRoute(app *fiber.App, handler *handler.HandlerStruct) {

	raceGroup := app.Group("/race")
	raceGroup.Get("/:id", handler.GetRaceDetailsById)
	raceGroup.Get("/", handler.GetAllRacesWithData)
	raceGroup.Post("/", handler.AddRace)
	raceGroup.Delete("/:id", handler.DeleteRaceById)

	statsRaceGroup := app.Group("/stats_race")
	statsRaceGroup.Get("/", handler.AddStatsRace)
	statsRaceGroup.Post("/:id", handler.AddStatsRace)

	// videoGroup := app.Group("/video")

	// // // Route pour gérer la connexion WebSocket
	// videoGroup.Use("/ws", func(c *fiber.Ctx) error {
	// 	// Only allow WebSocket requests
	// 	if websocket.IsWebSocketUpgrade(c) {
	// 		c.Locals("allowed", true)
	// 		return c.Next()
	// 	}
	// 	return fiber.ErrUpgradeRequired
	// })

}
