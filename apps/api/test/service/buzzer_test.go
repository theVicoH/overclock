package service__test

import (
	"Overclock/internal/service"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBuzzerServiceIsValidBuzzerVariable(t *testing.T) {
	svc := &service.BuzzerService{}
	t.Run("invalid Buzzer frequency too low", func(t *testing.T) {
		assert.False(t, svc.IsValidBuzzerVariable(-1))
	})

	t.Run("invalid Buzzer frequency too high", func(t *testing.T) {
		assert.False(t, svc.IsValidBuzzerVariable(10001))
	})

	t.Run("valid Buzzer upper boundary", func(t *testing.T) {
		assert.True(t, svc.IsValidBuzzerVariable(10000))
	})

	t.Run("valid Buzzer lower boundary", func(t *testing.T) {
		assert.True(t, svc.IsValidBuzzerVariable(0))
	})
}

// func TestBuzzerServiceSetBuzzerVariable(t *testing.T) {
// 	svc := &service.BuzzerService{}
// 	t.Run("set buzzer test", func(t *testing.T) {
// 		err := svc.SetBuzzerVariable(10000)
// 		assert.NoError(t, err)
// 	})
// }
