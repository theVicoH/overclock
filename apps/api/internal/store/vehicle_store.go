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

func (v *Store) AddVehicle(vehicle types.VehicleType) (types.VehicleType, error) {
	var vehicleData types.VehicleType
	vehicleData.Name = vehicle.Name

	if err := v.db.Table("vehicle").Create(&vehicleData).Error; err != nil {
		return vehicleData, err
	}
	return vehicleData, nil
}

func (v *Store) GetVehicleById(id string) (types.VehicleType, error) {

	var vehicle types.VehicleType
	if err := v.db.Table("vehicle").Where("id = ?", id).First(&vehicle).Error; err != nil {
		return vehicle, err
	}
	return vehicle, nil
}

func (v *Store) DeleteVehicleById(id string) (bool, error) {
	if err := v.db.Table("vehicle").Where("id = ?", id).Delete(&types.VehicleType{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

func (v *Store) UpdateVehicleById(id string, vehicleType types.VehicleType) (types.VehicleType, error) {

	var vehicle types.VehicleType
	if err := v.db.Table("vehicle").Where("id = ?", id).First(&vehicle).Error; err != nil {
		return vehicle, err
	}

	vehicle.Name = vehicleType.Name

	if err := v.db.Table("vehicle").Save(&vehicle).Error; err != nil {
		return vehicle, err
	}

	return vehicle, nil
}

func (v *Store) GetAllVehicle() ([]types.VehicleType, error) {
	var vehicle []types.VehicleType
	if err := v.db.Table("vehicle").Find(&vehicle).Error; err != nil {
		return nil, err
	}
	return vehicle, nil
}
