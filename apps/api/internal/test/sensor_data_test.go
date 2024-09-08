package overclock_test

import (
	"fmt"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func Test_Add_Sensor_Data_Success(t *testing.T) {
	mock, app, broker := setAppTestBroker(t)

	if app != nil {
		fmt.Print("")
	}
	raceUUID := uuid.New()
	sensorUUID := uuid.New()

	mock.ExpectBegin()

	rows := sqlmock.NewRows([]string{"id"}).AddRow(sensorUUID)
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "sensor_data" ("race_id","distance","speed","date","battery","track") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "id"`)).
		WithArgs(raceUUID.String(), 100.0, 120.0, sqlmock.AnyArg(), 80.0, 0).
		WillReturnRows(rows)
	mock.ExpectCommit()

	broker.Publish("esp32Bis/race", raceUUID.String())
	broker.Publish("esp32Bis/speed", "120")
	broker.Publish("esp32Bis/distance", "100")
	broker.Publish("esp32Bis/battery", "80.0")
	broker.Publish("esp32Bis/track", "25")

	err := mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Add_Sensor_Data_Failure(t *testing.T) {
	mock, app, broker := setAppTestBroker(t)

	if app != nil {
		fmt.Print("")
	}

	raceUUID := uuid.New()

	mock.ExpectBegin()
	mock.ExpectQuery(regexp.QuoteMeta(`INSERT INTO "sensor_data" ("race_id","distance","speed","date","battery","track") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "id"`)).
		WithArgs(raceUUID.String(), 100.0, 120.0, sqlmock.AnyArg(), 80.0, 0).
		WillReturnError(gorm.ErrInvalidData)

	broker.Publish("esp32Bis/race", raceUUID.String())
	broker.Publish("esp32Bis/speed", "120")
	broker.Publish("esp32Bis/distance", "100")
	broker.Publish("esp32Bis/battery", "80.0")
	broker.Publish("esp32Bis/track", "25")

	err := mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_Get_Sensor_Data_By_Id_Success(t *testing.T) {
	mock, app := setAppTest(t)

	if app != nil {
		fmt.Print("")
	}

	raceUUID := uuid.New()
	sensorUUID := uuid.New()

	mock.ExpectBegin()

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnRows(sqlmock.NewRows([]string{"id"}).
			AddRow(sensorUUID.String()))
	mock.ExpectCommit()

	err := mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
