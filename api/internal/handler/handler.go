package handler

import "Overclock/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}
