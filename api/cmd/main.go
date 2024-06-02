package main

import (
	"Overclock/internal/handler"
	"Overclock/internal/repository"
	"Overclock/internal/router"
	"Overclock/internal/service"
	"fmt"
	"log"
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
	buzzerHandler  *handler.BuzzerHandler
	faceHandler    *handler.FaceHandler
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
	buzzerRepo := repository.NewBuzzerRepository()
	faceRepo := repository.NewFaceRepository()

	controlService := service.NewControlService(controlRepo)
	buzzerService := service.NewBuzzerService(buzzerRepo)
	faceService := service.NewFaceService(faceRepo)

	controlHandler = handler.NewControlHandler(controlService)
	faceHandler = handler.NewFaceHandler(faceService)
	buzzerHandler = handler.NewBuzzerHandler(buzzerService)
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())

	app.Get("/swagger/*", swagger.HandlerDefault)
	router.ControlRoutes(app, controlHandler)
	router.BuzzerRoutes(app, buzzerHandler)
	router.FaceRoutes(app, faceHandler)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusNotFound)
	})

	go func() {
		if err := app.Listen(":3000"); err != nil {
			log.Fatalf("Error starting server: %v", err)
		}
	}()

	shutdown(app)
}

func shutdown(app *fiber.App) {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	<-c
	fmt.Println("Gracefully shutting down...")
	if err := app.Shutdown(); err != nil {
		log.Fatalf("Error shutting down server: %v", err)
	}

	fmt.Println("Running cleanup tasks...")
	// db.Close()
	fmt.Println("Fiber was successfully shut down.")
}
