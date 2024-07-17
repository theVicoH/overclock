package repository

import (
	"Overclock/internal/model"
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

var (
	confBuzzer = model.ConfBuzzer{
		Cmd: 8,
	}
)

func (r *websocketRepository) SetBuzzerVariable(buzzerVariable model.BuzzerVariable) error {
	confBuzzer.BuzzerVariable = buzzerVariable

	message, err := json.Marshal(confBuzzer)
	if err != nil {
		log.Println("Error marshalling ConfBuzzer:", err)
		return err
	}

	err = r.SendMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("error sending wheel speeds:", err)
		return err
	}

	log.Println("Buzzer infos sent successfully:", string(message))

	return nil
}
