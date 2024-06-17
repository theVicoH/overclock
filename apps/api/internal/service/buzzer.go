package service

import (
	"Overclock/internal/model"
	"fmt"
)

func (s *BuzzerService) IsValidBuzzerVariable(buzzerVariable model.BuzzerVariable) bool {
	if buzzerVariable < 0 || buzzerVariable > 10000 {
		return false
	}
	return true
}

func (s *BuzzerService) SetBuzzerVariable(buzzerVariable model.BuzzerVariable) error {
	err := s.buzzeRepo.SetBuzzerVariable(buzzerVariable)
	if err != nil {
		fmt.Println("Error : ", err)
		return err
	}
	return nil
}
