package handler

import (
	"Overclock/internal/model"
	"encoding/json"
	"fmt"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func (h *VideoHandler) Video(client mqtt.Client, msg mqtt.Message) {
	var videoVariable model.VideoVariable
	if err := json.Unmarshal(msg.Payload(), &videoVariable); err != nil {
		fmt.Printf("Error parsing message: %v\n", err)
		return
	}

	fmt.Println("Video message received", videoVariable)
	// if !h.videoService.IsValidVideoVariable(videoVariable) {
	// 	fmt.Println("Invalid VideoVariable value")
	// 	return
	// }

	// if err := h.videoService.SetVideoVariable(videoVariable); err != nil {
	// 	fmt.Printf("Error processing Video value: %v\n", err)
	// 	return
	// }
}
