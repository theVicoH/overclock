package store

import (
	"database/sql"
)

type VehicleStore struct {
	*sql.DB
}

func NewVehicleStore(db *sql.DB) *VehicleStore {
	return &VehicleStore{
		db,
	}
}
