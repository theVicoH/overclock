package handler

import (
	"Overclock/internal/store"

	"github.com/gofiber/fiber/v3"
)

func NewVehicleHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddVehicle(c fiber.Ctx) error {
	return nil
}

func (h *Handler) GetVehicleById(c fiber.Ctx) error {
	return nil
}

func (h *Handler) DeleteVehicleById(c fiber.Ctx) error {
	return nil
}

func (h *Handler) UpdateVehicleById(c fiber.Ctx) error {
	return nil
}
