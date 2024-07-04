package service

import (
	"Overclock/internal/model"
	"fmt"
)

var wheel model.WheelSpeed

func (s *ControlService) Direction(speeds model.WheelSpeed) error {

	err := s.controlRepo.Direction(speeds)
	if err != nil {
		fmt.Println("Error : ", err)
	}

	return nil
}

func (s *ControlService) TransformRawData(wheelRawData model.WheelRawData) model.WheelSpeed {
	// X > 0 -> droite
	// X < 0 -> gauche
	// Y > 0 -> bas
	// Y < 0 -> haut
	// on multiplie par la force et on envoie [4500 x force, 4500 x force, 4500 x force, 4500 x force]

	if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y < 0 {
		wheel = s.GoForward(wheelRawData)

	} else if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y > 0 {
		wheel = s.GoBack(wheelRawData)

	} else if wheelRawData.X > 25 {
		wheel = s.TurnLeft(wheelRawData)

	} else if wheelRawData.X < 25 {
		wheel = s.TurnRight(wheelRawData)

	} else if wheelRawData.X == 0 && wheelRawData.Y == 0 && wheelRawData.Force == 0 {
		wheel = s.Stop(wheelRawData)

	}

	return wheel
}

func (s *ControlService) GoForward(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force}
	fmt.Println("GO FORWARD", wheel)

	return wheel
}

func (s *ControlService) GoBack(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{-4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force}

	fmt.Println("GO BACK", wheel)
	return wheel

}

func (s *ControlService) TurnLeft(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{4095 * wheelRawData.Force, 4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force}

	fmt.Println("TURN LEFT <-", wheel)
	return wheel

}

func (s *ControlService) TurnRight(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{-4095 * wheelRawData.Force, -4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force}

	fmt.Println("TURN RIGHT ->", wheel)
	return wheel

}
func (s *ControlService) Stop(wheelRawData model.WheelRawData) model.WheelSpeed {

	wheel = model.WheelSpeed{0, 0, 0, 0}

	fmt.Println("STOP || ", wheel)
	return wheel

}
