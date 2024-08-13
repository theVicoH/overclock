package main

import (
	"Overclock/internal/broker"
	"Overclock/internal/database"
	"Overclock/internal/handler"
	"Overclock/internal/routes"
	"Overclock/internal/store"
	"database/sql"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v3"
)

func main() {
	var db = database.InitDb()
	var client = broker.InitBroker()

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get database object from GORM: %v", err)
	}

	broker.ReadMessages(client, "#", handler.MessageCallback)

	store := store.CreateStore(db, &client)
	handler := handler.CreateHandler(store, &client)

	app := fiber.New()
	routes.SetRoute(app, handler)

	app.Use(func(c fiber.Ctx) error {
		return c.SendStatus(fiber.StatusNotFound)
	})

	go func() {
		if err := app.Listen(":3000"); err != nil {
			log.Fatalf("Error starting server: %v", err)
		}
	}()

	shutdown(app, sqlDB)
}

func shutdown(app *fiber.App, sqlDB *sql.DB) {

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	<-c
	fmt.Println("Gracefully shutting down...")
	if err := app.Shutdown(); err != nil {
		log.Fatalf("Error shutting down server: %v", err)
	}

	fmt.Println("Running cleanup tasks...")
	if err := sqlDB.Close(); err != nil {
		log.Fatalf("Error closing database connection: %v", err)
	}
	fmt.Println("Fiber was successfully shut down.")
}
