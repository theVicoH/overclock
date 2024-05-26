package handler

import "Overclock/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

type HeadAngleHandler struct {
	headAngleService facade.HeadAngleService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}

func NewHeadAngleHandler(headAngleService facade.HeadAngleService) *HeadAngleHandler {
	return &HeadAngleHandler{headAngleService}
}
