package facade

import "Overclock/internal/model"

type FaceService interface {
	IsValidFace(face model.Face) bool
	IsValidAngle(angle model.HeadAngle) bool
	SetFace(face model.Face) error
	RotateHead(angle model.HeadAngle) error
}

type FaceRepository interface {
	SetFace(face model.Face) error
	RotateHead(angle model.HeadAngle) error
}
