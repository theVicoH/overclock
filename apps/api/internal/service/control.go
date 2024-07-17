package service

import (
	"Overclock/internal/model"
	"fmt"
	"time"
)

var (
	wheel     model.WheelSpeed
	prevValue model.WheelRawData
	prevTime  time.Time
)

func (s *ControlService) Direction(speeds model.WheelSpeed) error {

	err := s.controlRepo.Direction(speeds)
	if err != nil {
		fmt.Println("Error : ", err)
	}

	return nil
}

func (s *ControlService) TransformRawData(wheelRawData model.WheelRawData) (model.WheelSpeed, bool) {
	// X > 0 -> droite
	// X < 0 -> gauche
	// Y > 0 -> bas
	// Y < 0 -> haut
	// on multiplie par la force et on envoie [4500 x force, 4500 x force, 4500 x force, 4500 x force]
	now := time.Now()

	isTimeMoreThan10MS := s.MoreThan10Ms(now)
	areValueDifferent := s.ValueAreDifferent(prevValue, wheelRawData)

	if areValueDifferent && isTimeMoreThan10MS {
		prevValue = wheelRawData

		if wheelRawData.X == 0 && wheelRawData.Y == 0 && wheelRawData.Force == 0 {
			wheel = s.Stop(wheelRawData)

		} else if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y < 0 {
			wheel = s.GoForward(wheelRawData)

		} else if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y > 0 {
			wheel = s.GoBack(wheelRawData)

		} else if wheelRawData.X > 25 {
			wheel = s.TurnLeft(wheelRawData)

		} else if wheelRawData.X < 25 {
			wheel = s.TurnRight(wheelRawData)

		}

	} else {

		fmt.Println("wheel else", wheel)
		return wheel, false

	}

	return wheel, true
}

func (s *ControlService) GoForward(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{2095, 2095, 2095, 2095}
	fmt.Println("GO FORWARD", wheel)

	return wheel
}

func (s *ControlService) GoBack(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{-2095, -2095, -2095, -2095}

	fmt.Println("GO BACK", wheel)
	return wheel

}

func (s *ControlService) TurnLeft(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{2095, 2095, -2095, -2095}

	fmt.Println("TURN LEFT", wheel)
	return wheel

}

func (s *ControlService) TurnRight(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{-2095, -2095, 2095, 2095}

	fmt.Println("TURN RIGHT", wheel)
	return wheel

}
func (s *ControlService) Stop(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{0, 0, 0, 0}

	fmt.Println("STOP", wheel)
	return wheel

}

func (s *ControlService) MoreThan10Ms(now time.Time) bool {
	if now.Sub(prevTime) > 10*time.Millisecond {
		fmt.Println(" > 10 millisecond", now.Sub(prevTime))
		return true
	} else {
		fmt.Println(" > 10 millisecond", now.Sub(prevTime))

		return false
	}

}

func (s *ControlService) ValueAreDifferent(prevValue model.WheelRawData, wheelRawData model.WheelRawData) bool {

	if prevValue != wheelRawData {
		fmt.Println("prevValue != wheelRawData", prevValue != wheelRawData)
		return true
	} else {
		fmt.Println("prevValue != wheelRawData", prevValue != wheelRawData)

		return false
	}
}
