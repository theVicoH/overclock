package service

import (
	"Overclock/internal/model"
	"fmt"
)

func (s *BuzzerService) IsValidBuzzerVariable(buzzerVariable model.BuzzerVariable) bool {
	// Vérifie le premier élément (ON/OFF)
	if buzzerVariable[0] != 0 && buzzerVariable[0] != 1 {
		return false
	}
	// Vérifie le second élément (fréquence)
	if buzzerVariable[1] < 0 || buzzerVariable[1] > 10000 {
		return false
	}
	return true
}

func (s *BuzzerService) SetBuzzerVariable(buzzerVariable model.BuzzerVariable) error {

	err := s.buzzeRepo.SetBuzzerVariable(buzzerVariable)
	if err != nil {
		fmt.Println("Error : ", err)
	}

	return nil
}
