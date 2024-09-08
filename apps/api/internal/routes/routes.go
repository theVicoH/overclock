package routes

import (
	"Overclock/internal/handler"

	"github.com/gofiber/fiber/v3"
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

	vehicleGroup := app.Group("/vehicle")
	vehicleGroup.Get("/:id", handler.GetVehicleById)
	vehicleGroup.Get("/", handler.GetAllVehicle)
	vehicleGroup.Post("/", handler.AddVehicle)
	vehicleGroup.Delete("/:id", handler.DeleteVehicleById)
	vehicleGroup.Put("/:id", handler.UpdateVehicleById)

}
