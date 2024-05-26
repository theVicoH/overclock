package service

import "Overclock/internal/facade"

type ControlService struct {
	controlRepo facade.ControlRepository
}

type FaceService struct {
	faceRepo facade.FaceRepository
}
type HeadAngleService struct {
	headAngleRepo facade.HeadAngleRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}

func NewFaceService(faceRepo facade.FaceRepository) *FaceService {
	return &FaceService{faceRepo}
}

func NewHeadAngleService(headAngleRepo facade.HeadAngleRepository) *HeadAngleService {
	return &HeadAngleService{headAngleRepo}
}
