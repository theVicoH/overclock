package service

import (
	"Overclock/internal/model"
	"fmt"
)

func (s *FaceService) IsValidFace(face model.Face) bool {
	return face > 0 && face < 7
}

func (s *FaceService) SetFace(face model.Face) error {
	err := s.faceRepo.SetFace(face)
	if err != nil {
		fmt.Println("Error : ", err)
	}
	return nil
}

func (s *FaceService) IsValidAngle(angle model.HeadAngle) bool {
	for _, value := range angle {
		if value < 0 || value > 180 {
			return false
		}
	}
	return true
}

func (s *FaceService) RotateHead(angle model.HeadAngle) error {

	err := s.faceRepo.RotateHead(angle)
	if err != nil {
		fmt.Println("Error : ", err)
	}
	return nil
}
