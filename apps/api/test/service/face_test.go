package service__test

import (
	"Overclock/internal/model"
	"Overclock/internal/service"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFaceService_IsValidFace(t *testing.T) {
	svf := &service.FaceService{}

	t.Run("valid face", func(t *testing.T) {
		face := model.Face(2)
		assert.True(t, svf.IsValidFace(face))
	})

	t.Run("invalid face", func(t *testing.T) {
		face := model.Face(-5)
		assert.False(t, svf.IsValidFace(face))
	})
}

func TestFaceService_SetFace(t *testing.T) {
	svf := &service.FaceService{}

	t.Run("set face test", func(t *testing.T) {
		face := model.Face(2)
		err := svf.SetFace(face)
		assert.NoError(t, err)
	})
}

func TestFaceService_IsValidAngle(t *testing.T) {
	svf := &service.FaceService{}

	t.Run("valid headAngle", func(t *testing.T) {
		headAngle := model.HeadAngle{0, 180}
		assert.True(t, svf.IsValidAngle(headAngle))
	})

	t.Run("invalid headAngle", func(t *testing.T) {
		headAngle := model.HeadAngle{0, 260}
		assert.False(t, svf.IsValidAngle(headAngle))
	})
}

func TestFaceService_RotateHead(t *testing.T) {
	svf := &service.FaceService{}

	t.Run("set face test", func(t *testing.T) {
		headAngle := model.HeadAngle{0, 180}
		err := svf.RotateHead(headAngle)
		assert.NoError(t, err)
	})
}
