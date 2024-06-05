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
	return &websocketRepository{conn}
}

func NewBuzzerRepository(conn *websocket.Conn) facade.ControlRepository {
	return &websocketRepository{conn}
}

func NewHeadAngleRepository(conn *websocket.Conn) facade.HeadAngleRepository {
	return &websocketRepository{conn}
}

func NewFaceRepository(conn *websocket.Conn) facade.FaceRepository {
	return &websocketRepository{conn}
}

func (wr *websocketRepository) SendMessage(messageType int, message []byte) error {
	err := wr.conn.WriteMessage(messageType, message)
	if err != nil {
		log.Println("write:", err)
		return err
	}
	return nil
}
