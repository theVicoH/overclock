package handler

import (
	"Overclock/internal/store"

	"github.com/gofiber/fiber/v3"
)

func NewStatsRaceHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddStatsRace(c fiber.Ctx) error {
	return nil
}

func (h *Handler) GetStatsRaceById(c fiber.Ctx) error {
	return nil
}

func (h *Handler) DeleteStatsRaceById(c fiber.Ctx) error {
	return nil
}

func (h *Handler) UpdateStatsRaceById(c fiber.Ctx) error {
	return nil
}
