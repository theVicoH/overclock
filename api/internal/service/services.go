package service

import "Overclock/internal/facade"

type ControlService struct {
	controlRepo facade.ControlRepository
}

func NewControlService(controlRepo facade.ControlRepository) *ControlService {
	return &ControlService{controlRepo}
}

type BuzzerService struct{
	buzzeRepo facade.BuzzerRepository
}

func NewBuzzerService(buzzeRepo facade.BuzzerRepository) *BuzzerService{
	return &BuzzerService{buzzeRepo}
}