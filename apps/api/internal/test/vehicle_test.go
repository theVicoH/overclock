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

	assert.Equal(t, http.StatusOK, resp.StatusCode)

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
