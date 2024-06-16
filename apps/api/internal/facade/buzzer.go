package facade

import "Overclock/internal/model"

type BuzzerService interface {
	IsValidBuzzerVariable(buzzerVariable model.BuzzerVariable) bool
	SetBuzzerVariable(buzzerVariable model.BuzzerVariable) error
}

type BuzzerRepository interface {
	SetBuzzerVariable(buzzerVariable model.BuzzerVariable) error
}
