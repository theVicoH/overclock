package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"

	"github.com/gofiber/fiber/v3"
)

func NewVehicleHandler(store *store.StoreStruct) *Handler {
	return &Handler{
		store,
	}
}

func (h *Handler) AddVehicle(c fiber.Ctx) error {

	var requestData types.RequestTypeVehicle

	if err := c.Bind().Body(&requestData); err != nil {
		return err
	}

	vehicleData := types.VehicleType{
		Name: requestData.Data.Name,
	}

	success, err := h.store.AddVehicle(vehicleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusAccepted,
		"message": "Vehicle successfully added",
		"data":    success,
	})

}

func (h *Handler) GetVehicleById(c fiber.Ctx) error {

	id := c.Params("id")
	success, err := h.store.GetVehicleById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusAccepted,
		"message": "Vehicle successfully added",
		"data":    success,
	})

}

func (h *Handler) DeleteVehicleById(c fiber.Ctx) error {
	id := c.Params("id")

	success, err := h.store.DeleteVehicleById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusAccepted,
		"message": "Vehicle successfully removed",
		"data":    success,
	})

}

func (h *Handler) UpdateVehicleById(c fiber.Ctx) error {
	var requestData types.RequestTypeVehicle
	id := c.Params("id")

	if err := c.Bind().Body(&requestData); err != nil {
		return err
	}

	vehicleData := types.VehicleType{
		Name: requestData.Data.Name,
	}

	success, err := h.store.UpdateVehicleById(id, vehicleData)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusAccepted,
		"message": "Vehicle successfully update",
		"data":    success,
	})
}

func (h *Handler) GetAllVehicle(c fiber.Ctx) error {
	success, err := h.store.GetAllVehicle()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
			"code":  fiber.StatusInternalServerError,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"code":    fiber.StatusAccepted,
		"message": "Vehicle successfully fetched",
		"data":    success,
	})
}
