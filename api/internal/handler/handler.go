package handler

import "Overclock/internal/facade"

type ControlHandler struct {
	controlService facade.ControlService
}

type FaceHandler struct {
	faceService facade.FaceService
}
type HeadAngleHandler struct {
	headAngleService facade.FaceService
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

type VideoVariableHandler struct {
	videoService facade.VideoVariableService
}

func NewVideoHandler(videoService facade.VideoVariableService) *VideoVariableHandler {
	return &VideoVariableHandler{videoService}
}

func NewFaceHandler(faceHandler facade.FaceService) *FaceHandler {
	return &FaceHandler{faceHandler}
}
func NewHeadAngleHandler(headAngleService facade.FaceService) *HeadAngleHandler {
	return &HeadAngleHandler{headAngleService}

}
