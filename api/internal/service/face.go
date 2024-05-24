package service

import (
	"Overclock/internal/model"
)

func (s *FaceService) IsValidFace(face model.Face) bool {
	return face < 7
}

func (s *FaceService) SetFace(face model.Face) error {
	return nil
}
