package facade

import "Overclock/internal/model"

type VideoVariableService interface {
	IsValideVideoVariable(videoVariable model.VideoVariable) bool
	SetVideo(videoVariable model.VideoVariable) error
}

type VideoVariableRepository interface {
	SetVideo(videoVariable model.VideoVariable) error
}
