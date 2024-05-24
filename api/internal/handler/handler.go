package handler

import "Overclock/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

type FaceHandler struct {
	faceService facade.FaceService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}

func NewFaceHandler(faceHandler facade.FaceService) *FaceHandler {
	return &FaceHandler{faceHandler}
}
