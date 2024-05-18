package main

import (
	"Overclock/internal/handler"
	"Overclock/internal/repository"
	"Overclock/internal/router"
	"Overclock/internal/service"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	_ "Overclock/internal/doc"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
)

var (
	controlHandler *handler.ControlHandler
)

func init() {
	// db := database.ConnectDB(database.DBConfig{
	// 	Host:     os.Getenv("DB_HOST"),
	// 	Port:     os.Getenv("DB_PORT"),
	// 	User:     os.Getenv("DB_USER"),
	// 	Password: os.Getenv("DB_PASSWORD"),
	// 	Name:     os.Getenv("DB_NAME"),
	// 	Type:     os.Getenv("DB_TYPE"),
	// })

	controlRepo := repository.NewControlRepository()

	controlService := service.NewControlService(controlRepo)

	controlHandler = handler.NewControlHandler(controlService)

}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())

	app.Get("/swagger/*", swagger.HandlerDefault)
	router.ControlRoutes(app, controlHandler)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusNotFound)
	})

	app.Listen(":3000")
}

func shutdown(app *fiber.App) {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	_ = <-c
	fmt.Println("Gracefully shutting down...")
	_ = app.Shutdown()

	fmt.Println("Running cleanup tasks...")
	// db.Close()
	fmt.Println("Fiber was successful shutdown.")
}
