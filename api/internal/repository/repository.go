package repository

import (
	"Overclock/internal/facade"
	"log"

	// "database/sql"
	"github.com/gorilla/websocket"
)

type websocketRepository struct {
	conn *websocket.Conn
}

// type DatabaseRepository struct {
// 	db *sql.DB
// }

func NewControlRepository() facade.ControlRepository {
	return &websocketRepository{}
}

func NewBuzzerRepository() facade.ControlRepository {
	return &websocketRepository{}

}

func NewVideoRepository() facade.VideoVariableRepository {
	return &websocketRepository{}
}

func NewHeadAngleRepository() facade.HeadAngleRepository {
	return &websocketRepository{}
}

func NewFaceRepository() facade.FaceRepository {
	return &websocketRepository{}
}

func (wr *websocketRepository) SendMessage(messageType int, message []byte) error {
	err := wr.conn.WriteMessage(messageType, message)
	if err != nil {
		log.Println("write:", err)
		return err
	}
	return nil
}
