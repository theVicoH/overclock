package overclock_test

import (
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func Test_AddStatsRace_Success(t *testing.T) {
	mock, app := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE race_id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	// Make HTTP request
	req := httptest.NewRequest(http.MethodPost, "/stats_race/"+raceUUID.String(), nil)
	resp, err := app.Test(req)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
