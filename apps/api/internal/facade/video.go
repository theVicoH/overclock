package facade

import "Overclock/internal/model"

type VideoService interface {
	IsValideVideoVariable(videoVariable model.VideoVariable) bool
	SetVideo(videoVariable model.VideoVariable) error
}

type VideoRepository interface {
	SetVideo(videoVariable model.VideoVariable) error
}
