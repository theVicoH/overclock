package facade

import "Overclock/internal/model"

type ControlService interface {
	TransformRawData(wheelRawData model.WheelRawData) model.WheelSpeed
	Direction(speeds model.WheelSpeed) error
}

type ControlRepository interface {
	Direction(speeds model.WheelSpeed) error
}
