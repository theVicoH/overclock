package handler

import (
	"Overclock/internal/store"
	"log"
	"github.com/gofiber/contrib/websocket"
)

func NewVideoHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

// WebSocketConnection gère la connexion WebSocket.
func (h *Handler) WebSocketConnection() {
	websocket.New(func(c *websocket.Conn) {
		defer func() {
			if err := c.Close(); err != nil {
				log.Println("Failed to close WebSocket connection:", err)
			}
		}()

		for {
			messageType, msg, err := c.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
				break
			}

			if err := c.WriteMessage(messageType, msg); err != nil {
				log.Println("Error writing message:", err)
				break
			}
		}
	})
}
