package handler

import (
	"Overclock/internal/facade"
	"encoding/json"
	"log"

	"github.com/gofiber/websocket/v2"
)

type Response struct {
	Status  string
	Message string
}

type ControlHandler struct {
	controlService facade.ControlService
}

type FaceHandler struct {
	faceService facade.FaceService
}
type HeadAngleHandler struct {
	headAngleService facade.FaceService
}

type BuzzerHandler struct {
	buzzerService facade.BuzzerService
}

type VideoVariableHandler struct {
	videoService facade.VideoVariableService
}

func NewControlHandler(controlService facade.ControlService) *ControlHandler {
	return &ControlHandler{controlService}
}

func NewBuzzerHandler(buzzerService facade.BuzzerService) *BuzzerHandler {
	return &BuzzerHandler{buzzerService}
}

func NewVideoHandler(videoService facade.VideoVariableService) *VideoVariableHandler {
	return &VideoVariableHandler{videoService}
}

func NewFaceHandler(faceHandler facade.FaceService) *FaceHandler {
	return &FaceHandler{faceHandler}
}

func NewHeadAngleHandler(headAngleService facade.FaceService) *HeadAngleHandler {
	return &HeadAngleHandler{headAngleService}

}

func sendResponse(c *websocket.Conn, status string, message string) {
	response := Response{
		Status:  status,
		Message: message,
	}
	responseJSON, err := json.Marshal(response)
	if err != nil {
		log.Printf("Error marshaling response: %v", err)
		return
	}
	if err := c.WriteMessage(websocket.TextMessage, responseJSON); err != nil {
		log.Printf("Error writing message: %v", err)
	}
}
