package repository

import (
	"Overclock/internal/facade"
	// "database/sql"
)

type websocketRepository struct {
}

// type DatabaseRepository struct {
// 	db *sql.DB
// }

func NewControlRepository() facade.ControlRepository {
	return &websocketRepository{}
}

func NewBuzzerRepository() facade.ControlRepository {
}

func NewHeadAngleRepository() facade.HeadAngleRepository {
	return &websocketRepository{}
}
