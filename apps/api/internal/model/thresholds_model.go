package model

import "Overclock/internal/types"

type ThresholdsModelInterface interface {
	AddThresholds(thresholds types.ThresholdsType) (bool, error)
}
