package service

import (
	"Overclock/internal/model"
)

func (s *HeadAngleService) IsValidAngle(angle model.HeadAngle) bool {
	for _, value := range angle {
		if value < 0 || value > 180 {
			return false
		}
	}
	return true
}

func (s *HeadAngleService) RotateHead(angle model.HeadAngle) error {
	return nil
}
