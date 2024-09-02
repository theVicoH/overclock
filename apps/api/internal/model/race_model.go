package model

import (
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type RaceModelHandler interface {
	AddRace(fiber.Ctx) error
	GetRaceById(fiber.Ctx) error
	GetRaceDetailsById(fiber.Ctx) error
	GetAllRacesWithData(fiber.Ctx) error
	DeleteRaceById(fiber.Ctx) error
}

type RaceModelStore interface {
	AddRace(raceData types.RaceType) (types.RaceType, error)
	GetRaceById(id string) (types.RaceType, error)
	GetRaceDetailsByID(raceID uuid.UUID) (*types.RaceDetailsResponse, error)
	GetAllRacesWithData() ([]types.RacesResponse, error)
	DeleteRaceById(id string) (bool, error)
}
