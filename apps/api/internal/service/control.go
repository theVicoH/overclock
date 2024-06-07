package service

import (
	"Overclock/internal/model"
)

func (s *ControlService) IsValidSpeed(speeds model.WheelSpeed) bool {
	for _, value := range speeds {
		if value < -4095 || value > 4095 {
			return false
		}
	}
	return true
}

func (s *ControlService) Direction(speeds model.WheelSpeed) error {
	return nil
}
