package routes

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v3"
)

func SetRoute(app *fiber.App, handler *handler.HandlerStruct) {
	sensorGroup := app.Group("/sensor")
	sensorGroup.Get("/:id", handler.GetSensorDataById)

	raceGroup := app.Group("/race")
	raceGroup.Get("/:id", handler.GetRaceById)
	raceGroup.Get("/", handler.GetAllRace)
	raceGroup.Post("/", handler.AddRace)
	raceGroup.Delete("/:id", handler.DeleteRaceById)
	raceGroup.Put("/:id", handler.UpdateRaceById)

	statsRaceGroup := app.Group("/stats_race")
	statsRaceGroup.Get("/:id", handler.GetStatsRaceById)
	statsRaceGroup.Post("/:id", handler.AddStatsRace)
	statsRaceGroup.Delete("/:id", handler.DeleteStatsRaceById)
	// statsRaceGroup.Get("/", handler.GetAllRace)
	// statsRaceGroup.Get("/", handler.AddStatsRace)
	// statsRaceGroup.Put("/:id", handler.UpdateStatsRaceById)
}
