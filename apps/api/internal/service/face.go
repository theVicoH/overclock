package service

import (
	"Overclock/internal/model"
)

func (s *FaceService) IsValidFace(face model.Face) bool {
	return face > 0
}

func (s *FaceService) SetFace(face model.Face) error {
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
	return nil
}
