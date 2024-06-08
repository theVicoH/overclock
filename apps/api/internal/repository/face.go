package repository

import (
	"Overclock/internal/model"
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

var (
	confFace = model.ConfFace{
		Cmd: 1,
	}

	confHeadAngle = model.ConfHeadAngle{
		Cmd: 3,
	}
)

func (r *websocketRepository) SetFace(face model.Face) error {
	confFace.Face = face

	message, err := json.Marshal(confFace)
	if err != nil {
		log.Println("Error marshalling Face:", err)
		return err
	}

	err = r.SendMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("error sending wheel speeds:", err)
		return err
	}

	log.Println("Face changed successfully:", string(message))

	return nil
}

func (r *websocketRepository) RotateHead(angle model.HeadAngle) error {
	confHeadAngle.HeadAngle = angle

	message, err := json.Marshal(confHeadAngle)
	if err != nil {
		log.Println("Error marshalling Face:", err)
		return err
	}

	err = r.SendMessage(websocket.TextMessage, message)
	if err != nil {
		log.Println("error sending wheel speeds:", err)
		return err
	}

	log.Println("Head rotated successfully:", string(message))

	return nil
}
