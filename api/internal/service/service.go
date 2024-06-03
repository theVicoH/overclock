package service

import (
	"Overclock/internal/facade"
)

type ControlService struct {
	controlRepo facade.ControlRepository
}

type FaceService struct {
	faceRepo facade.FaceRepository
}

type HeadAngleService struct {
	headAngleRepo facade.HeadAngleRepository
}

type BuzzerService struct {
	buzzeRepo facade.BuzzerRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}

func NewBuzzerService(buzzeRepo facade.BuzzerRepository) *BuzzerService {
	return &BuzzerService{buzzeRepo}
}

func NewFaceService(faceRepo facade.FaceRepository) *FaceService {
	return &FaceService{faceRepo}
}

func NewHeadAngleService(headAngleRepo facade.HeadAngleRepository) *HeadAngleService {
	return &HeadAngleService{headAngleRepo}
}
