package overclock_test

import (
	"fmt"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func Test_Add_Sensor_Data_Success(t *testing.T) {
	mock, app, _, broker := setAppTest(t)

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
	mock, app, _, broker := setAppTest(t)

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

func Test_Get_Sensor_Data_By_Race_Id_Success(t *testing.T) {
	mock, _, store, _ := setAppTest(t)

	raceUUID := uuid.New()
	sensorUUID := uuid.New()

	rows := sqlmock.NewRows([]string{"id", "race_id", "distance", "speed", "date", "battery", "track"}).
		AddRow(sensorUUID.String(), raceUUID.String(), 100.0, 120.0, time.Now().Truncate(time.Second), 80.0, 0)

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE race_id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnRows(rows)

	sensorData, err := store.SensorModelStore.GetSensorDataByRaceId(raceUUID)

	assert.NoError(t, err)
	assert.NotNil(t, sensorData)
	assert.Equal(t, 1, len(sensorData))
	assert.Equal(t, float64(100.0), sensorData[0].Distance)
	assert.Equal(t, float64(120.0), sensorData[0].Speed)
	assert.Equal(t, float64(80.0), sensorData[0].Battery)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}

func Test_GetSensorDataByRaceId_Error(t *testing.T) {
	mock, _, store, _ := setAppTest(t)

	raceUUID := uuid.New()

	mock.ExpectQuery(regexp.QuoteMeta(`SELECT * FROM "sensor_data" WHERE race_id = $1`)).
		WithArgs(raceUUID.String()).
		WillReturnError(fmt.Errorf("database error"))

	sensorData, err := store.SensorModelStore.GetSensorDataByRaceId(raceUUID)

	assert.Error(t, err)
	assert.Nil(t, sensorData)

	err = mock.ExpectationsWereMet()
	assert.NoError(t, err)
}
