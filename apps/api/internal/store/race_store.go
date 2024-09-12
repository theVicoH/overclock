package store

import (
	"Overclock/internal/types"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func NewRaceStore(db *gorm.DB) *Store {
	return &Store{
		db,
	}
}

func (s *Store) AddRace(race types.RaceType) (types.RaceType, error) {
	var raceData types.RaceType
	raceData.Date = time.Now()
	raceData.VehicleId = race.VehicleId
	raceData.Name = race.Name

	if err := s.db.Table("race").Create(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) GetRaceById(id string) (types.RaceType, error) {
	var raceData types.RaceType
	if err := s.db.Table("race").Where("id = ?", id).First(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) DeleteRaceById(id string) (bool, error) {
	if err := s.db.Table("race").Where("id = ?", id).Delete(&types.RaceType{}).Error; err != nil {
		return false, err
	}
	return true, nil
}

func (s *Store) UpdateRaceById(id string, updatedData types.RaceType) (types.RaceType, error) {
	var raceData types.RaceType
	if err := s.db.Table("race").Where("id = ?", id).First(&raceData).Error; err != nil {
		return raceData, err
	}

	raceData.Name = updatedData.Name
	raceData.VehicleId = updatedData.VehicleId
	raceData.Date = time.Now()

	if err := s.db.Table("race").Save(&raceData).Error; err != nil {
		return raceData, err
	}
	return raceData, nil
}

func (s *Store) GetAllRace() ([]types.RaceType, error) {
	var raceData []types.RaceType
	if err := s.db.Table("race").Find(&raceData).Error; err != nil {
		return nil, err
	}
	return raceData, nil
}

func (s *Store) GetAllRacesWithData() ([]types.RacesResponse, error) {
	var raceData []types.RacesResponse

	if err := s.db.Table("race").
		Select("race.*, stats_race.time, stats_race.speed_average, stats_race.distance, stats_race.id IS NOT NULL AS is_finish, vehicle.name AS vehicle_name").
		Joins("LEFT JOIN stats_race ON stats_race.race_id = race.id").
		Joins("LEFT JOIN vehicle ON vehicle.id = race.vehicle_id").
		Order("stats_race.date DESC").
		Scan(&raceData).Error; err != nil {
		return nil, err
	}

	return raceData, nil
}

func (s *Store) GetRaceDetailsByID(raceId uuid.UUID) (*types.RaceDetailsResponse, error) {
	var race types.Race

	if err := s.db.Preload("Vehicle").
		Preload("Stats").
		Preload("Sensors").
		Where("id = ?", raceId).
		First(&race).Error; err != nil {
		return nil, err
	}

	sensorData := types.SensorDataResponse{
		Distance: []float64{},
		Speed:    []float64{},
		Battery:  []float64{},
		Track:    []int{},
		Date:     []time.Time{},
	}

	for _, sensor := range race.Sensors {
		sensorData.Distance = append(sensorData.Distance, sensor.Distance)
		sensorData.Speed = append(sensorData.Speed, sensor.Speed)
		sensorData.Battery = append(sensorData.Battery, sensor.Battery)
		sensorData.Track = append(sensorData.Track, sensor.Track)
		sensorData.Date = append(sensorData.Date, sensor.Date)
	}

	raceResponse := &types.RaceDetailsResponse{
		RaceData:    race,
		VehicleName: race.Vehicle.Name,
		Stats:       race.Stats,
		Sensor:      sensorData,
	}

	return raceResponse, nil
}
