package service

import (
	"Overclock/internal/model"
	"fmt"
)

func (v *VideoService) IsValideVideoVariable(video model.VideoVariable) bool {
	if video != 0 && video != 1 {
		return false
	}
	return true
}

func (s *VideoService) SetVideo(videoVariable model.VideoVariable) error {
	err := s.videoRepo.SetVideo(videoVariable)
	if err != nil {
		fmt.Println("Error : ", err)
		return err
	}
	return nil
}
