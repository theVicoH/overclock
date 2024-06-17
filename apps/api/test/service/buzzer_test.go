package service__test

import (
	"Overclock/internal/model"
	"Overclock/internal/service"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBuzzerService_IsValidBuzzerVariable(t *testing.T) {
	svc := &service.BuzzerService{}
	t.Run("invalid Buzzer frequency too low", func(t *testing.T) {
		buzzer := model.BuzzerVariable{-1}
		assert.False(t, svc.IsValidBuzzerVariable(buzzer))
	})

	t.Run("invalid Buzzer frequency too high", func(t *testing.T) {
		buzzer := model.BuzzerVariable{10001}
		assert.False(t, svc.IsValidBuzzerVariable(buzzer))
	})

	t.Run("valid Buzzer upper boundary", func(t *testing.T) {
		buzzer := model.BuzzerVariable{10000}
		assert.True(t, svc.IsValidBuzzerVariable(buzzer))
	})

	t.Run("valid Buzzer lower boundary", func(t *testing.T) {
		buzzer := model.BuzzerVariable{0}
		assert.True(t, svc.IsValidBuzzerVariable(buzzer))
	})
}
func TestBuzzerService_SetBuzzerVariable(t *testing.T) {
	svc := &service.BuzzerService{}
	t.Run("set buzzer test", func(t *testing.T) {
		buzzer := model.BuzzerVariable{10000}
		err := svc.SetBuzzerVariable(buzzer)
		assert.NoError(t, err)
	})
}
