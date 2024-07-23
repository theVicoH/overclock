package model

import "Overclock/internal/types"

type ThresholdsModelInterface interface {
	AddThresholds(thresholds types.ThresholdsType) (bool, error)
	GetThresholdsById(id int) (types.ThresholdsType, error)
	DeleteThresholdsById(id int) (bool, error)
	UpdateThresholdsById(id int) (types.ThresholdsType, error)
}
