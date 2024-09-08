package overclock_test

import (
	"Overclock/internal/types"
	"bytes"
	"encoding/json"
	"log"
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

func Test_Add_Race_Route_Success(t *testing.T) {
	mock, app := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectBegin()
	rows := sqlmock.NewRows([]string{"id"}).AddRow(raceUUID)
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "race" ("vehicle_id","name","date") VALUES ($1,$2,$3) RETURNING "id"`)).
		WithArgs(raceUUID, "Test Race", sqlmock.AnyArg()).
		WillReturnRows(rows)
	mock.ExpectCommit()

	raceData := types.RaceTestType{
		Data: types.RaceType{
			VehicleId: raceUUID,
			Name:      "Test Race",
		},
	}
	reqBody, _ := json.Marshal(raceData)

	req := httptest.NewRequest(http.MethodPost, "/race", bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Add_Race_Route_Failure(t *testing.T) {
	mock, app := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "race" ("vehicle_id","name","date") VALUES ($1,$2,$3) RETURNING "id"`)).
		WithArgs(raceUUID, "Test Race", sqlmock.AnyArg()).
		WillReturnError(gorm.ErrInvalidData)
	mock.ExpectRollback()

	raceData := types.RaceTestType{
		Data: types.RaceType{
			VehicleId: raceUUID,
			Name:      "Test Race",
		},
	}
	reqBody, _ := json.Marshal(raceData)

	req := httptest.NewRequest(http.MethodPost, "/race", bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Delete_Race_Route_Success(t *testing.T) {
	mock, app := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta(`DELETE FROM "race" WHERE id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	req := httptest.NewRequest(http.MethodDelete, "/race/"+raceUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Delete_Race_Route_Failure(t *testing.T) {
	mock, app := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta(`DELETE FROM "race" WHERE id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnError(gorm.ErrRecordNotFound)
	mock.ExpectRollback()

	req := httptest.NewRequest(http.MethodDelete, "/race/"+raceUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_All_Races_With_Data_Route_Success(t *testing.T) {
	mock, app := setAppTest(t)

	vehicleName := "Test Vehicle"
	raceData := types.RacesResponse{
		VehicleName:  vehicleName,
		Name:         "Test Race",
		SpeedAverage: 150.5,
		Distance:     500,
		IsFinish:     true,
	}

	rows := sqlmock.NewRows([]string{"vehicle_name", "name", "speed_average", "distance", "is_finish"}).
		AddRow(raceData.VehicleName, raceData.Name, raceData.SpeedAverage, raceData.Distance, raceData.IsFinish)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.*, stats_race.time, stats_race.speed_average, stats_race.distance, stats_race.id IS NOT NULL AS is_finish, vehicle.name AS vehicle_name FROM "race"`)).
		WillReturnRows(rows)

	req := httptest.NewRequest(http.MethodGet, "/race", nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)

}

func Test_Get_All_Races_With_Data_Route_Failure(t *testing.T) {
	mock, app := setAppTest(t)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT race.*, stats_race.time, stats_race.speed_average, stats_race.distance, stats_race.id IS NOT NULL AS is_finish, vehicle.name AS vehicle_name FROM "race"`)).
		WillReturnError(gorm.ErrInvalidData)

	req := httptest.NewRequest(http.MethodGet, "/race", nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Race_Details_By_Id_Route_Success(t *testing.T) {
	mock, app := setAppTest(t)
	raceUUID := uuid.New()
	vehicleUUID := uuid.New()
	statsId := uuid.New()
	sensorId := uuid.New()

	raceData := types.Race{
		Id:   raceUUID,
		Name: "Test Race",
		Date: time.Now(),
		Vehicle: types.VehicleType{
			Id:   vehicleUUID,
			Name: "Test Vehicle",
		},
		Stats: types.StatsRaceType{
			Id:           statsId,
			RaceId:       raceUUID,
			Distance:     500,
			SpeedMax:     50,
			SpeedAverage: 150.5,
			BatteryMax:   15,
			BatteryMin:   12,
			Time:         3600,
			Date:         time.Now(),
		},
		Sensors: []types.SensorData{
			{
				Id:       sensorId,
				RaceId:   raceUUID,
				Distance: 100,
				Speed:    120,
				Battery:  80,
				Track:    1,
				Date:     time.Now(),
			},
		},
	}

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "race" WHERE id = $1 ORDER BY "race"."id" LIMIT $2`)).
		WithArgs(raceData.Id.String(), 1).
		WillReturnRows(sqlmock.NewRows([]string{"id", "name", "date"}).
			AddRow(raceData.Id, raceData.Name, raceData.Date))

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE "sensor_data"."race_id" = $1`)).
		WithArgs(raceData.Id.String()).
		WillReturnRows(sqlmock.NewRows([]string{"id", "race_id", "distance", "speed", "battery", "track", "date"}).
			AddRow(raceData.Sensors[0].Id, raceData.Sensors[0].RaceId, raceData.Sensors[0].Distance, raceData.Sensors[0].Speed, raceData.Sensors[0].Battery, raceData.Sensors[0].Track, raceData.Sensors[0].Date))

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "stats_race" WHERE "stats_race"."race_id" = $1`)).
		WithArgs(raceData.Id.String()).
		WillReturnRows(sqlmock.NewRows([]string{"id", "race_id", "distance", "speed_max", "speed_average", "battery_max", "battery_min", "time", "date"}).
			AddRow(raceData.Stats.Id, raceData.Stats.RaceId, raceData.Stats.Distance, raceData.Stats.SpeedMax, raceData.Stats.SpeedAverage, raceData.Stats.BatteryMax, raceData.Stats.BatteryMin, raceData.Stats.Time, raceData.Stats.Date))

	req := httptest.NewRequest(http.MethodGet, "/race/"+raceData.Id.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	if err != nil {

		log.Print("race_test.go l.260 ERR =>", err)
	}
	assert.NoError(t, err)
}

func Test_Get_Race_Details_By_Id_Route_Failure(t *testing.T) {
	mock, app := setAppTest(t)
	raceUUID := uuid.New()
	vehicleUUID := uuid.New()
	statsId := uuid.New()
	sensorId := uuid.New()

	raceData := types.Race{
		Id:   raceUUID,
		Name: "Test Race",
		Date: time.Now(),
		Vehicle: types.VehicleType{
			Id:   vehicleUUID,
			Name: "Test Vehicle",
		},
		Stats: types.StatsRaceType{
			Id:           statsId,
			RaceId:       raceUUID,
			Distance:     500,
			SpeedMax:     50,
			SpeedAverage: 150.5,
			BatteryMax:   15,
			BatteryMin:   12,
			Time:         3600,
			Date:         time.Now(),
		},
		Sensors: []types.SensorData{
			{
				Id:       sensorId,
				RaceId:   raceUUID,
				Distance: 100,
				Speed:    120,
				Battery:  80,
				Track:    1,
				Date:     time.Now(),
			},
		},
	}

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "race" WHERE id = $1 ORDER BY "race"."id" LIMIT $2`)).
		WithArgs(raceData.Id.String(), 1).
		WillReturnRows(sqlmock.NewRows([]string{"id", "name", "date"}).
			AddRow(raceData.Id, raceData.Name, raceData.Date))

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE "sensor_data"."race_id" = $1`)).
		WithArgs(raceData.Id.String()).
		WillReturnRows(sqlmock.NewRows([]string{"id", "race_id", "distance", "speed", "battery", "track", "date"}).
			AddRow(raceData.Sensors[0].Id, raceData.Sensors[0].RaceId, raceData.Sensors[0].Distance, raceData.Sensors[0].Speed, raceData.Sensors[0].Battery, raceData.Sensors[0].Track, raceData.Sensors[0].Date))

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "stats_race" WHERE "stats_race"."race_id" = $1`)).
		WithArgs(raceData.Id.String()).
		WillReturnError(gorm.ErrInvalidData)

	req := httptest.NewRequest(http.MethodGet, "/race/"+raceData.Id.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	if err != nil {

		log.Print("race_test.go l.260 ERR =>", err)
	}
	assert.NoError(t, err)
}
