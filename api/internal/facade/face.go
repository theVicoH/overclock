package facade

import "Overclock/internal/model"

type FaceService interface {
	IsValidFace(face model.Face) bool
	SetFace(face model.Face) error
}

type FaceRepository interface {
}
