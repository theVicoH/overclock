package facade

import "Overclock/internal/model"

type ControlService interface {
	TransformRawData(wheelRawData model.WheelRawData) (model.WheelSpeed, bool)

	GoForward(wheelRawData model.WheelRawData) model.WheelSpeed
	Stop(wheelRawData model.WheelRawData) model.WheelSpeed
	TurnLeft(wheelRawData model.WheelRawData) model.WheelSpeed
	TurnRight(wheelRawData model.WheelRawData) model.WheelSpeed
	GoBack(wheelRawData model.WheelRawData) model.WheelSpeed

	Direction(speeds model.WheelSpeed) error
}

type ControlRepository interface {
	Direction(speeds model.WheelSpeed) error
}
