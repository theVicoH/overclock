package service

import "Overclock/internal/facade"

type ControlService struct {
	controlRepo facade.ControlRepository
}

type FaceService struct {
	faceRepo facade.FaceRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}

func NewFaceService(faceRepo facade.FaceRepository) *FaceService {
	return &FaceService{faceRepo}
}
