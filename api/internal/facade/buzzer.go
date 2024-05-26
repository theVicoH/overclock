	package facade

	import "Overclock/internal/model"

	type BuzzerService interface {
		IsValidBuzzerVariable(buzzerVariable model.BuzzerVariable) bool
	}

	type BuzzerRepository interface{
	}
