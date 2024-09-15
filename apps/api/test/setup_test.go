package overclock_test

import (
	"Overclock/internal/handler"
	"Overclock/internal/store"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	vehicleUUID = uuid.New()
	raceUUID    = uuid.New()
	statsUUID   = uuid.New()
	sensorUUID  = uuid.New()
)

func setDbMockTest(t *testing.T) (sqlmock.Sqlmock, *gorm.DB) {
	db, mock, err := sqlmock.New()
	assert.NoError(t, err)

	gormDB, err := gorm.Open(postgres.New(postgres.Config{
		Conn: db,
	}), &gorm.Config{
		Logger: logger.Default,
	})
	assert.NoError(t, err)

	return mock, gormDB
}

func setAppTest(t *testing.T) (sqlmock.Sqlmock, *fiber.App, *store.StoreStruct, *MockBroker) {
	app := fiber.New()

	mock, gormDB := setDbMockTest(t)
	storeStruct := setStoreTest(gormDB)
	handler := setHandlerTest(storeStruct)
	setRouterTest(app, handler)

	broker := NewMockBroker()
	mqttHandler := handler.SensorModelHandler
	broker.SetCallback(mqttHandler.MessageCallback)

	return mock, app, storeStruct, broker
}

func setStoreTest(gormDB *gorm.DB) *store.StoreStruct {
	return &store.StoreStruct{
		RaceModelStore:   store.NewRaceStore(gormDB),
		SensorModelStore: store.NewSenSorDataStore(gormDB),
		StatsRaceStore:   store.NewStatsRaceStore(gormDB),
	}

}

func setHandlerTest(store *store.StoreStruct) *handler.HandlerStruct {
	return &handler.HandlerStruct{
		SensorModelHandler: handler.NewSenSorDataHandler(store, nil),
		RaceModelHandler:   handler.NewRaceHandler(store),
		StatsRaceHandler:   handler.NewStatsRaceHandler(store, nil),
	}
}

func setRouterTest(app *fiber.App, handler *handler.HandlerStruct) {
	raceGroup := app.Group("/race")
	raceGroup.Get("/:id", handler.GetRaceDetailsById) //done
	raceGroup.Get("/", handler.GetAllRacesWithData)   //done
	raceGroup.Post("/", handler.AddRace)              //done
	raceGroup.Delete("/:id", handler.DeleteRaceById)  //done

	vehicleGroup := app.Group("/vehicle")
	vehicleGroup.Get("/details", handler.GetAllVehiclesWithRaces)
	vehicleGroup.Get("/stats", handler.GetVehiclesStats)
	vehicleGroup.Get("/sort", handler.GetClassementBySpeed)
	vehicleGroup.Get("/:id", handler.GetVehicleById)
	vehicleGroup.Get("/stats/:id", handler.GetVehicleStatsById)
	vehicleGroup.Get("/details/:id", handler.GetVehicleWithRacesById)
	vehicleGroup.Get("/", handler.GetAllVehicle)
	vehicleGroup.Post("/", handler.AddVehicle)

	statsRaceGroup := app.Group("/stats_race")
	statsRaceGroup.Get("/", handler.AddStatsRace)
	statsRaceGroup.Post("/:id", handler.AddStatsRace)
}

type MockBroker struct {
	messages map[string]string
	callback func(string, string)
}

func NewMockBroker() *MockBroker {
	return &MockBroker{messages: make(map[string]string)}
}

func (m *MockBroker) Publish(topic, message string) {
	m.messages[topic] = message
	m.callback(message, topic)
}

func (m *MockBroker) SetCallback(cb func(string, string)) {
	m.callback = cb
}
