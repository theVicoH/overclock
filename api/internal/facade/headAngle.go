package facade

import "Overclock/internal/model"

type HeadAngleService interface {
	IsValidAngle(angle model.HeadAngle) bool
	RotateHead(angle model.HeadAngle) error
}

type HeadAngleRepository interface {
}
