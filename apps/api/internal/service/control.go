package service

import (
	"Overclock/internal/model"
	"fmt"
)

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
	var wheel model.WheelSpeed
	// on multiplie par la force et on envoie [4500 x force, 4500 x force, 4500 x force, 4500 x force]

	if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y < 0 {
		fmt.Println(wheelRawData.X)
		wheel = model.WheelSpeed{4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force}

		fmt.Println(wheel)
	} else if (wheelRawData.X >= -25 && wheelRawData.X <= 25) && wheelRawData.Y > 0 {
		fmt.Println(wheelRawData.X)
		wheel = model.WheelSpeed{-4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force}

		fmt.Println(wheel)
	} else if wheelRawData.X > 25 {
		wheel = model.WheelSpeed{4095 * wheelRawData.Force, 4095 * wheelRawData.Force, -4095 * wheelRawData.Force, -4095 * wheelRawData.Force}

		fmt.Println(wheel)

	} else if wheelRawData.X < 25 {
		wheel = model.WheelSpeed{-4095 * wheelRawData.Force, -4095 * wheelRawData.Force, 4095 * wheelRawData.Force, 4095 * wheelRawData.Force}

		fmt.Println(wheel)
	} else if wheelRawData.X == 0 && wheelRawData.Y == 0 && wheelRawData.Force == 0 {
		wheel = model.WheelSpeed{0, 0, 0, 0}

		fmt.Println(wheel)
	}

	return wheel
}
