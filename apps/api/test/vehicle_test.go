package overclock_test

import (
	"Overclock/internal/types"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func Test_Add_Vehicle_Route_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	mock.ExpectBegin()
	rows := sqlmock.NewRows([]string{"id"}).AddRow(raceUUID)
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "vehicle" ("name") VALUES ($1) RETURNING "id"`)).
		WithArgs("Vehicle 1").
		WillReturnRows(rows)
	mock.ExpectCommit()

	raceData := types.RequestTypeVehicle{
		Data: types.VehicleUpdateType{
			Name: "Vehicle 1",
		},
	}
	reqBody, _ := json.Marshal(raceData)

	req := httptest.NewRequest(http.MethodPost, "/vehicle", bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Add_Vehicle_Route_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	mock.ExpectBegin()
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "vehicle" ("name") VALUES ($1) RETURNING "id"`)).
		WithArgs("Vehicle 1").
		WillReturnError(gorm.ErrInvalidData)
	mock.ExpectRollback()

	raceData := types.RequestTypeVehicle{
		Data: types.VehicleUpdateType{
			Name: "Vehicle 1",
		},
	}
	reqBody, _ := json.Marshal(raceData)

	req := httptest.NewRequest(http.MethodPost, "/vehicle", bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_By_Id_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicleUUID.String(), "Voiture 1")
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle" WHERE id = $1 ORDER BY "vehicle"."id" LIMIT $2`)).
		WithArgs(vehicleUUID.String(), 1).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/"+vehicleUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_By_Id_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle" WHERE id = $1 ORDER BY "vehicle"."id" LIMIT $2`)).
		WithArgs(vehicleUUID.String(), 1).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/"+vehicleUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_All_Vehicle_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicleUUID.String(), "Voiture 1")
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle"`)).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/", nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_All_Vehicle_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle"`)).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/", nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_All_Vehicles_With_Races_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicle := types.VehicleType{
		Id:   vehicleUUID,
		Name: "Ancien nom",
	}

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicle.Id.String(), vehicle.Name)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.* FROM "vehicle"`)).
		WillReturnRows(rows)

	raceRows := sqlmock.NewRows([]string{"id", "name", "time", "date", "speed_average", "distance"}).
		AddRow(raceUUID.String(), "toto", 12, time.Now().Truncate(time.Second), 120, 10)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.id, race.name, stats_race.time, stats_race.date, stats_race.speed_average, stats_race.distance FROM "race" LEFT JOIN stats_race ON stats_race.race_id = race.id WHERE race.vehicle_id = $1`)).
		WithArgs(vehicle.Id.String()).
		WillReturnRows(raceRows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/details", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_All_Vehicles_With_Races_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicle := types.VehicleType{
		Id:   vehicleUUID,
		Name: "Ancien nom",
	}

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicle.Id.String(), vehicle.Name)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.* FROM "vehicle"`)).
		WillReturnRows(rows)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.id, race.name, stats_race.time, stats_race.date, stats_race.speed_average, stats_race.distance FROM "race" LEFT JOIN stats_race ON stats_race.race_id = race.id WHERE race.vehicle_id = $1`)).
		WithArgs(vehicle.Id.String()).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/details", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicles_Stats_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	rows := sqlmock.NewRows([]string{"id", "name", "max_speed", "max_distance", "min_time"}).
		AddRow(vehicleUUID.String(), "toto", 12.0, 15.0, 120)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time FROM "vehicle" LEFT JOIN race ON race.vehicle_id = vehicle.id LEFT JOIN stats_race ON stats_race.race_id = race.id GROUP BY "vehicle"."id"`)).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/stats", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicles_Stats_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	sqlmock.NewRows([]string{"id", "name", "max_speed", "max_distance", "min_time"}).
		AddRow(vehicleUUID.String(), "toto", 12.0, 15.0, 120)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time FROM "vehicle" LEFT JOIN race ON race.vehicle_id = vehicle.id LEFT JOIN stats_race ON stats_race.race_id = race.id GROUP BY "vehicle"."id"`)).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/stats", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Classement_By_Speed_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	rows := sqlmock.NewRows([]string{"id", "name", "max_speed"}).
		AddRow(vehicleUUID.String(), "toto", 12.0)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed FROM "vehicle" LEFT JOIN race ON race.vehicle_id = vehicle.id LEFT JOIN stats_race ON stats_race.race_id = race.id GROUP BY "vehicle"."id" ORDER BY max_speed DESC`)).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/sort", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Classement_By_Speed_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	sqlmock.NewRows([]string{"id", "name", "max_speed"}).
		AddRow(vehicleUUID.String(), "toto", 12.0)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed 
		FROM "vehicle" 
		LEFT JOIN race 
		ON race.vehicle_id = vehicle.id 
		LEFT JOIN stats_race ON stats_race.race_id = race.id 
		GROUP BY "vehicle"."id" 
		ORDER BY max_speed DESC`)).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/sort", nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_Stats_By_Id_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	rows := sqlmock.NewRows([]string{"id", "name", "max_speed", "max_distance", "min_time"}).
		AddRow(vehicleUUID.String(), "toto", 12.0, 15.0, 20)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time FROM "vehicle" 
			LEFT JOIN race ON race.vehicle_id = vehicle.id 
			LEFT JOIN stats_race ON stats_race.race_id = race.id 
			WHERE vehicle.id = $1 
			GROUP BY "vehicle"."id"`)).
		WithArgs(vehicleUUID).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/stats/"+vehicleUUID.String(), nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_Stats_By_Id_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

	sqlmock.NewRows([]string{"id", "name", "max_speed", "max_distance", "min_time"}).
		AddRow(vehicleUUID.String(), "toto", 12.0, 15.0, 20)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT vehicle.id, vehicle.name, MAX(stats_race.speed_max) as max_speed, MAX(stats_race.distance) as max_distance, MIN(stats_race.time) as min_time FROM "vehicle" 
			LEFT JOIN race ON race.vehicle_id = vehicle.id 
			LEFT JOIN stats_race ON stats_race.race_id = race.id 
			WHERE vehicle.id = $1 
			GROUP BY "vehicle"."id"`)).
		WithArgs(vehicleUUID).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/stats/"+vehicleUUID.String(), nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_With_Races_By_Id_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicle := types.VehicleWithRacesDetailType{
		ID:   vehicleUUID.String(),
		Name: "Car Name",
		Races: []types.RaceDetailType{
			{
				ID:           raceUUID.String(),
				Name:         "Race 1",
				Date:         time.Now(),
				Time:         120,
				SpeedAverage: 80.5,
				Distance:     300.0,
			},
			{
				ID:           raceUUID.String(),
				Name:         "Race 2",
				Date:         time.Now(),
				Time:         140,
				SpeedAverage: 78.3,
				Distance:     250.5,
			},
		},
	}

	racesJSON, err := json.Marshal(vehicle.Races)
	if err != nil {
		panic(err)
	}

	rows := sqlmock.NewRows([]string{"id", "name", "races"}).
		AddRow(vehicle.ID, vehicle.Name, string(racesJSON))
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT id, name FROM "vehicle" WHERE id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnRows(rows)

	raceRows := sqlmock.NewRows([]string{"id", "name", "date", "time", "speed_average", "distance"}).
		AddRow(vehicle.ID, vehicle.Name, vehicle.Races[0].Date, vehicle.Races[0].Time, vehicle.Races[0].SpeedAverage, vehicle.Races[0].Distance)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.id, race.name, stats_race.date, stats_race.time, stats_race.speed_average, stats_race.distance 
		FROM "race" 
		LEFT JOIN stats_race 
		ON stats_race.race_id = race.id 
		WHERE race.vehicle_id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnRows(raceRows)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/details/"+vehicleUUID.String(), nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_With_Races_By_Id_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicle := types.VehicleWithRacesDetailType{
		ID:   vehicleUUID.String(),
		Name: "Car Name",
		Races: []types.RaceDetailType{
			{
				ID:           raceUUID.String(),
				Name:         "Race 1",
				Date:         time.Now(),
				Time:         120,
				SpeedAverage: 80.5,
				Distance:     300.0,
			},
			{
				ID:           raceUUID.String(),
				Name:         "Race 2",
				Date:         time.Now(),
				Time:         140,
				SpeedAverage: 78.3,
				Distance:     250.5,
			},
		},
	}

	racesJSON, err := json.Marshal(vehicle.Races)
	if err != nil {
		panic(err)
	}

	rows := sqlmock.NewRows([]string{"id", "name", "races"}).
		AddRow(vehicle.ID, vehicle.Name, string(racesJSON))
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT id, name FROM "vehicle" WHERE id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnRows(rows)

	sqlmock.NewRows([]string{"id", "name", "date", "time", "speed_average", "distance"}).
		AddRow(vehicle.ID, vehicle.Name, vehicle.Races[0].Date, vehicle.Races[0].Time, vehicle.Races[0].SpeedAverage, vehicle.Races[0].Distance)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.id, race.name, stats_race.date, stats_race.time, stats_race.speed_average, stats_race.distance 
		FROM "race" 
		LEFT JOIN stats_race 
		ON stats_race.race_id = race.id 
		WHERE race.vehicle_id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnError(gorm.ErrRecordNotFound)

	req := httptest.NewRequest(http.MethodGet, "/vehicle/details/"+vehicleUUID.String(), nil)
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
