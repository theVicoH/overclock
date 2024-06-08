package service

import (
	"Overclock/internal/model"
	"fmt"
)

func (v *VideoVariableService) IsValideVideoVariable(videoVariable model.VideoVariable) bool {
	if videoVariable != 0 && videoVariable != 1 {
		return false
	}
	return true
}

func (s *VideoVariableService) SetVideo(videoVariable model.VideoVariable) error {
	err := s.videoRepo.SetVideo(videoVariable)
	if err != nil {
		fmt.Println("Error : ", err)
		return err
	}
	return nil
}
