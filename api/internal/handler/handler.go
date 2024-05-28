package handler

import "Overclock/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

type FaceHandler struct {
	faceService facade.FaceService
}
type HeadAngleHandler struct {
	headAngleService facade.HeadAngleService
}

type BuzzerHandler struct {
	buzzerService facade.BuzzerService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}

func NewBuzzerHandler(buzzerService facade.BuzzerService) *BuzzerHandler {
	return &BuzzerHandler{buzzerService}
}

func NewFaceHandler(faceHandler facade.FaceService) *FaceHandler {
	return &FaceHandler{faceHandler}
}
func NewHeadAngleHandler(headAngleService facade.HeadAngleService) *HeadAngleHandler {
	return &HeadAngleHandler{headAngleService}

}
