package facade

import "Overclock/internal/model"

type ControlService interface {
	IsValidSpeed(speeds model.WheelSpeed) bool
	Direction(speeds model.WheelSpeed) error
}

type ControlRepository interface {
	Direction(speeds model.WheelSpeed) error
}
