package handler

import (
	"Overclock/internal/store"
	"Overclock/internal/types"
	"github.com/google/uuid"
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

	vehicle, err := h.store.AddVehicle(vehicleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error adding Vehicle",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Vehicle successfully added",
		"data":    vehicle,
	})

}

func (h *Handler) GetVehicleById(c fiber.Ctx) error {

	id := c.Params("id")
	vehicle, err := h.store.GetVehicleById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error fetching vehicle",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Vehicle successfully added",
		"data":    vehicle,
	})

}

func (h *Handler) DeleteVehicleById(c fiber.Ctx) error {
	id := c.Params("id")

	vehicle, err := h.store.DeleteVehicleById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error deleting vehicle",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Vehicle successfully deleted",
		"data":    vehicle,
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

	vehicle, err := h.store.UpdateVehicleById(id, vehicleData)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating vehicle",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Vehicle successfully updated",
		"data":    vehicle,
	})
}

func (h *Handler) GetAllVehicle(c fiber.Ctx) error {
	vehicle, err := h.store.GetAllVehicle()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": vehicle,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Vehicle successfully fetched",
		"data":    vehicle,
	})
}

func (h *Handler) GetAllVehiclesWithRaces(c fiber.Ctx) error {
	vehicules, err := h.store.GetAllVehiclesWithRaces()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching vehicule",
			"error":   err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "vehicule successfully fetched",
		"date":    vehicules,
	})
}

func (h *Handler) GetVehicleWithRacesById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid UUID format",
		})
	}
	vehicule, err := h.store.GetVehicleWithRacesById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching vehicule",
			"error" : err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message" : "vehicule successfully fetched",
		"date" : vehicule,
	})
}

func (h *Handler) GetVehiclesStats(c fiber.Ctx) error {
	vehicules, err := h.store.GetVehiclesStats()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching vehicule",
			"error" : err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message" : "vehicule successfully fetched",
		"date" : vehicules,
	})
}

func (h *Handler) GetVehicleStatsById(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid UUID format",
		})
	}
	vehicules, err := h.store.GetVehicleStatsById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching vehicule",
			"error" : err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message" : "vehicule successfully fetched",
		"date" : vehicules,
	})
}

func (h *Handler) GetClassementBySpeed(c fiber.Ctx) error {
	vehiculesclassementBySpeed, err := h.store.GetClassementBySpeed()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching vehicule",
			"error" : err,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message" : "vehicule successfully fetched",
		"date" : vehiculesclassementBySpeed,
	})
}
