package store

import (
	"Overclock/internal/types"
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

func (v *VehicleStore) AddVehicle(vehicle types.VehicleType) (bool, error) {

	return true, nil
}
