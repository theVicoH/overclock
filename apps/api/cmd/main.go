package main

import (
	"Overclock/internal/database"
	"Overclock/internal/routes"
	"Overclock/internal/store"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v3"
)

var db = database.InitDb()

func main() {

	myStore := store.CreateStore(db)

	app := fiber.New()
	routes.SetRoute(app, myStore)

	app.Use(func(c fiber.Ctx) error {
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
