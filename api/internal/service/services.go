package service

import "Overclock/internal/facade"

type ControlService struct {
	controlRepo facade.ControlRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}
