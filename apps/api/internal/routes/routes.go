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
	statsRaceGroup.Get("/", handler.AddStatsRace)
	statsRaceGroup.Delete("/:id", handler.DeleteStatsRaceById)
	statsRaceGroup.Put("/:id", handler.UpdateStatsRaceById)

	vehicleGroup := app.Group("/vehicle")
	vehicleGroup.Get("/:id", handler.GetVehicleById)
	vehicleGroup.Get("/", handler.GetAllVehicle)
	vehicleGroup.Post("/", handler.AddVehicle)
	vehicleGroup.Delete("/:id", handler.DeleteVehicleById)
	vehicleGroup.Put("/:id", handler.UpdateVehicleById)
}
