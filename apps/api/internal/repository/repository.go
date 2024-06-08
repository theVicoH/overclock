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

func NewControlRepository(conn *websocket.Conn) facade.ControlRepository {
	return &websocketRepository{conn: conn}
}

func NewBuzzerRepository(conn *websocket.Conn) facade.BuzzerRepository {
	return &websocketRepository{conn: conn}
}

func NewVideoRepository(conn *websocket.Conn) facade.VideoVariableRepository {
	return &websocketRepository{conn: conn}
}

func NewFaceRepository(conn *websocket.Conn) facade.FaceRepository {
	return &websocketRepository{conn: conn}
}

func (wr *websocketRepository) SendMessage(messageType int, message []byte) error {
	err := wr.conn.WriteMessage(messageType, message)
	if err != nil {
		log.Println("write:", err)
		return err
	}
	return nil
}
