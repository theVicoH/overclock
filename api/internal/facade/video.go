package facade

import "Overclock/internal/model"

type VideoVariableService interface {
	IsValideVideoVariable(VideoVariable model.VideoVariable) bool
	SetVideoVariable(videoVariable model.VideoVariable) error
}

type VideoVariableRepository interface {
}