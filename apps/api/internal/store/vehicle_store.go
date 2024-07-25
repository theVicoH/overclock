package store

import (
	"Overclock/internal/types"

	"gorm.io/gorm"
)

func NewVehicleStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (v *Store) AddVehicle(vehicle types.VehicleType) (bool, error) {

	return false, nil
}

func (v *Store) GetVehicleById(id int) (types.VehicleType, error) {

	var vehicle types.VehicleType

	return vehicle, nil
}

func (v *Store) DeleteVehicleById(id int) (bool, error) {

	return false, nil
}

func (v *Store) UpdateVehicleById(id int) (types.VehicleType, error) {

	var vehicle types.VehicleType

	return vehicle, nil
}
