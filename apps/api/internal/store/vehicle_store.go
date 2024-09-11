package store

import (
	"Overclock/internal/types"

	"github.com/google/uuid"
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

func (v *Store) GetAllVehiclesWithRaces() ([]types.VehicleWithRacesDetailType, error) {
	var vehicles []types.VehicleWithRacesDetailType

	// Récupérer tous les véhicules
	if err := v.db.Table("vehicle").
		Select("vehicle.*").
		Scan(&vehicles).Error; err != nil {
		return nil, err
	}

	// Pour chaque véhicule, récupérer les courses associées
	for i := range vehicles {
		var races []types.RaceDetailType
		if err := v.db.Table("race").
			Select("race.id, race.name, stats_race.time, stats_race.date, stats_race.speed_average, stats_race.distance").
			Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
			Where("race.vehicle_id = ?", vehicles[i].ID).
			Scan(&races).Error; err != nil {
			return nil, err
		}

		// Ajout Des courses au véhicule
		vehicles[i].Races = races
	}

	return vehicles, nil
}

func (v *Store) GetVehicleWithRacesById(id uuid.UUID) (types.VehicleWithRacesDetailType, error) {
	var vehicle types.VehicleWithRacesDetailType
	var races []types.RaceDetailType
	
	// Récupérer les détails du véhicule
	if err := v.db.Table("vehicle").
		Select("id, name").
		Where("id = ?", id).
		Scan(&vehicle).Error; err != nil {
		return vehicle, err
	}

	// Récupérer les courses associées au véhicule
	if err := v.db.Table("race").
		Select("race.id, race.name, stats_race.date, stats_race.time, stats_race.speed_average, stats_race.distance").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Where("race.vehicle_id = ?", id).
		Scan(&races).Error; err != nil {
		return vehicle, err
	}

	// Assigner les courses au véhicule
	vehicle.Races = races

	return vehicle, nil
}

func (v *Store) GetVehiclesStats() ([]types.VehicleStatsDetailType, error) {
	var vehicleStats []types.VehicleStatsDetailType

	// Requête pour récupérer les stats véhicule
	if err := v.db.Table("vehicle").
		Select("vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time").
		Joins("LEFT JOIN race ON race.vehicle_id = vehicle.id").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Group("vehicle.id").
		Scan(&vehicleStats).Error; err != nil {
		return nil, err
	}

	return vehicleStats, nil
}

func (v *Store) GetVehicleStatsById(id uuid.UUID) ([]types.VehicleStatsDetailType, error) {
	var vehicleStats []types.VehicleStatsDetailType

	// Requête pour récupérer les stats véhicule
	if err := v.db.Table("vehicle").
		Select("vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time").
		Joins("LEFT JOIN race ON race.vehicle_id = vehicle.id").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Where("vehicle.id = ?", id).
		Group("vehicle.id").
		Scan(&vehicleStats).Error; err != nil {
		return nil, err
	}

	return vehicleStats, nil
}

func (v *Store) GetClassementBySpeed() ([]types.VehiculeClassementBySpeedMax, error) {
	var vehiculesclassementBySpeed []types.VehiculeClassementBySpeedMax

	// Requête pour obtenir le classement par vitesse maximale
	if err := v.db.Table("vehicle").
		Select("vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed").
		Joins("LEFT JOIN race ON race.vehicle_id = vehicle.id").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Group("vehicle.id").
		Order("max_speed DESC").
		Scan(&vehiculesclassementBySpeed).Error; err != nil {
		return nil, err
	}

	return vehiculesclassementBySpeed, nil
}
