package facade

import "Overclock/internal/model"

type VideoVariableService interface {
	IsValideVideoVariable(VideoVariable model.VideoVariable) bool
}

type VideoVariableRepository interface {

}