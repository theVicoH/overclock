package overclock_test

import (
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func Test_Add_Stats_Race_Success(t *testing.T) {
	mock, app, _, _ := setAppTest(t)

	raceUUID := uuid.New()
	sensorUUID := uuid.New()

	currentTime := time.Now().Truncate(time.Second)

	rows := sqlmock.NewRows([]string{"id", "race_id", "distance", "speed", "date", "battery", "track"}).
		AddRow(sensorUUID.String(), raceUUID.String(), 100.0, 120.0, currentTime, 80.0, 0)
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE race_id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnRows(rows)

	mock.ExpectBegin()

	mock.ExpectExec(regexp.QuoteMeta(`INSERT INTO "stats_race" ("race_id","distance","speed_max","speed_average","battery_max","battery_min","time","date") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "id"`)).
		WithArgs(
			raceUUID.String(),
			100.0,
			120.0,
			120.0,
			80.0,
			80.0,
			0,
			sqlmock.AnyArg(), // Pour la date, car elle est dynamique
		).
		WillReturnResult(sqlmock.NewResult(1, 1)) // Retourner un résultat valide avec LastInsertId

	mock.ExpectCommit()

	req := httptest.NewRequest(http.MethodPost, "/stats_race/"+raceUUID.String(), nil)
	resp, err := app.Test(req)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, resp.StatusCode)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
