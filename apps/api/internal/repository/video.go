package repository

import (
	"Overclock/internal/model"
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

var (
	confVideo = model.ConfVideo{
		Cmd: 9,
	}
)

func (r *websocketRepository) SetVideo(videoVariable model.VideoVariable) error {
	confVideo.VideoVariable = videoVariable

	message, err := json.Marshal(confVideo)
	if err != nil {
		log.Println("Error marshalling videoVariable", err)
		return err
	}

	err = r.SendMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("Error sending video var", err)
		return err
	}

	log.Println("Video turnes On/Off successfully", string(message))

	return nil
}
