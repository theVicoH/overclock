package repository

import (
	"Overclock/internal/model"
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

func (r *websocketRepository) Direction(speeds model.WheelSpeed) error {
	message, err := json.Marshal(speeds)
	if err != nil {
		log.Println("error marshalling wheel speeds:", err)
		return err
	}

	err = r.SendMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("error sending wheel speeds:", err)
		return err
	}

	log.Println("Wheel speeds sent successfully:", string(message))
	return nil
}
