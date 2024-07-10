package facade

import (
	"Overclock/internal/model"
	"time"
)

type ControlService interface {
	TransformRawData(wheelRawData model.WheelRawData) (model.WheelSpeed, bool)

	MoreThan10Ms(now time.Time) bool
	ValueAreDifferent(prevValue model.WheelRawData, wheelRawData model.WheelRawData) bool

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
