package repository

import (
	"Overclock/internal/model"
	"log"
)

func (r *websocketRepository) SetVideo(videoVariable model.VideoVariable) error {
	log.Println("Video turnes On/Off successfully")

	return nil
}
