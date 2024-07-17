package service

import (
	"Overclock/internal/facade"
)

type VideoService struct {
	videoRepo facade.VideoRepository
}

func NewVideoService(videoRepo facade.VideoRepository) *VideoService {
	return &VideoService{videoRepo}
}
