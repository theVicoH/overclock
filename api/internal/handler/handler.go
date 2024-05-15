package handler

import "Vroom/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}
