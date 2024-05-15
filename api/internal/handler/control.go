package handler

import (
	"github.com/gofiber/fiber/v2"
)

func (h *ControlHandler) ManualControl(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
}
