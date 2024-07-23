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

	return false, nil
}

func (v *VehicleStore) GetVehicleById(id int) (types.VehicleType, error) {

	var vehicle types.VehicleType

	return vehicle, nil
}

func (v *VehicleStore) DeleteVehicleById(id int) (bool, error) {

	return false, nil
}

func (v *VehicleStore) UpdateVehicleById(id int) (types.VehicleType, error) {

	var vehicle types.VehicleType

	return vehicle, nil
}
