package service__test

import (
	"Overclock/internal/model"
	"Overclock/internal/service"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestVideoVariableService_IsValidVideoVariable(t *testing.T) {
	svc := &service.VideoVariableService{}

	t.Run("valid VideoVariable 0", func(t *testing.T) {
		videoVariable := model.VideoVariable(0)
		assert.True(t, svc.IsValideVideoVariable(videoVariable))
	})

	t.Run("valid VideoVariable 1", func(t *testing.T) {
		videoVariable := model.VideoVariable(1)
		assert.True(t, svc.IsValideVideoVariable(videoVariable))
	})

	t.Run("invalid VideoVariable -1", func(t *testing.T) {
		videoVariable := model.VideoVariable(-1)
		assert.False(t, svc.IsValideVideoVariable(videoVariable))
	})

	t.Run("invalid VideoVariable 2", func(t *testing.T) {
		videoVariable := model.VideoVariable(2)
		assert.False(t, svc.IsValideVideoVariable(videoVariable))
	})
}
func TestVideoVariableService_SetVideo(t *testing.T) {
	svc := &service.VideoVariableService{}
	t.Run("set video test", func(t *testing.T) {
		videoVariable := model.VideoVariable(2)
		err := svc.SetVideo(videoVariable)
		assert.NoError(t, err)
	})
}
