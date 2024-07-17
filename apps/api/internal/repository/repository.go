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

func NewVideoRepository() facade.VideoRepository {
	return &websocketRepository{}
}
