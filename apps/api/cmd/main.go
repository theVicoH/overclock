package main

import (
	"Overclock/internal/handler"
	"Overclock/internal/repository"
	"Overclock/internal/service"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var (
	videoHandler *handler.VideoHandler
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

	broker := os.Getenv("BROKER")
	clientID := os.Getenv("CLIENT_ID")
	username := os.Getenv("USERNAME")
	password := os.Getenv("PASSWORD")

	videoRepo := repository.NewVideoRepository()

	videoService := service.NewVideoService(videoRepo)

	videoHandler = handler.NewVideoHandler(videoService, broker, clientID, username, password)
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	// router.ControlRoutes(app, controlHandler)
	// router.BuzzerRoutes(app, buzzerHandler)
	// router.VideoRoutes(app, videoHandler)
	// router.FaceRoutes(app, faceHandler)

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
