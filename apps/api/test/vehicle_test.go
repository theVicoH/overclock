package overclock_test

import (
	"Overclock/internal/types"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func Test_Add_Vehicle_Route_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	raceUUID := uuid.New()

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

func Test_Delete_Vehicle_Route_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta(`DELETE FROM "vehicle" WHERE id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	req := httptest.NewRequest(http.MethodDelete, "/vehicle/"+vehicleUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Delete_Vehicle_Route_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta(`DELETE FROM "vehicle" WHERE id = $1`)).
		WithArgs(vehicleUUID.String()).
		WillReturnError(gorm.ErrRecordNotFound)
	mock.ExpectRollback()

	req := httptest.NewRequest(http.MethodDelete, "/vehicle/"+vehicleUUID.String(), nil)

	resp, err := app.Test(req, -1)
	assert.NoError(t, err)

	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Vehicle_By_Id_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

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

	vehicleUUID := uuid.New()

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

	vehicleUUID := uuid.New()

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

func Test_Update_Vehicle_By_Id_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

	vehicle := types.VehicleType{
		Id:   vehicleUUID,
		Name: "Ancien nom",
	}

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicle.Id.String(), vehicle.Name)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle" WHERE id = $1 ORDER BY "vehicle"."id" LIMIT $2`)).
		WithArgs(vehicle.Id.String(), 1).
		WillReturnRows(rows)

	mock.ExpectBegin()

	mock.ExpectExec(regexp.QuoteMeta(`UPDATE "vehicle" SET "name"=$1 WHERE "id" = $2`)).
		WithArgs("Nouveau nom", vehicle.Id).
		WillReturnResult(sqlmock.NewResult(1, 1))

	mock.ExpectCommit()

	requestBody := types.RequestTypeVehicle{
		Data: types.VehicleUpdateType{Name: "Nouveau nom"},
	}

	requestBodyJSON, _ := json.Marshal(requestBody)

	req := httptest.NewRequest(http.MethodPut, "/vehicle/"+vehicle.Id.String(), bytes.NewBuffer(requestBodyJSON))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
func Test_Update_Vehicle_By_Id_Failure(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	vehicleUUID := uuid.New()

	vehicle := types.VehicleType{
		Id:   vehicleUUID,
		Name: "Ancien nom",
	}

	rows := sqlmock.NewRows([]string{"id", "name"}).
		AddRow(vehicle.Id.String(), vehicle.Name)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "vehicle" WHERE id = $1 ORDER BY "vehicle"."id" LIMIT $2`)).
		WithArgs(vehicle.Id.String(), 1).
		WillReturnRows(rows)

	mock.ExpectBegin()

	mock.ExpectExec(regexp.QuoteMeta(`UPDATE "vehicle" SET "name"=$1 WHERE "id" = $2`)).
		WithArgs("Nouveau nom", vehicle.Id).
		WillReturnError(gorm.ErrRecordNotFound)

	mock.ExpectRollback()

	requestBody := types.RequestTypeVehicle{
		Data: types.VehicleUpdateType{Name: "Nouveau nom"},
	}

	requestBodyJSON, _ := json.Marshal(requestBody)

	req := httptest.NewRequest(http.MethodPut, "/vehicle/"+vehicle.Id.String(), bytes.NewBuffer(requestBodyJSON))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
