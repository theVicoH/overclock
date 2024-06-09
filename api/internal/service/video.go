package service

import "Overclock/internal/model"

func (v *VideoVariableService) IsValideVideoVariable(videoVariable model.VideoVariable) bool {
	if videoVariable != 0 && videoVariable != 1 {
		return false
	}
	return true
}

func (v *VideoVariableService) SetVideoVariable(videoVariable model.VideoVariable) error {
	return nil
}