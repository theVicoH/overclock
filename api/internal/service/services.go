package service

import "Overclock/internal/facade"

type ControlService struct {
	controlRepo facade.ControlRepository
}

type HeadAngleService struct {
	headAngleRepo facade.HeadAngleRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}

func NewHeadAngleService(headAngleRepo facade.HeadAngleRepository) *HeadAngleService {
	return &HeadAngleService{headAngleRepo}
}
