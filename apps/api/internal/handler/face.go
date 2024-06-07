package handler

import (
	"Overclock/internal/model"
	"encoding/json"

	"github.com/gofiber/websocket/v2"
)

// ChangeFace
// @Summary Set the face of the vehicule
// @Description Receive an ID via WebSocket
// @Tags control
// @Accept json
// @Produce json
// @Param face body model.Face true "Face id"
// @Success 200 {string} string "OK"
// @Failure 400 {string} string "Error"
// @Router /v1/face/set [get]
func (h *FaceHandler) ChangeFace(c *websocket.Conn) {
	defer c.Close()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error reading message")); writeErr != nil {
				return
			}
			break
		}

		var face model.Face
		if err := json.Unmarshal(message, &face); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				return
			}
			break
		}

		if !h.faceService.IsValidFace(face) {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Invalid face value")); writeErr != nil {
				return
			}
			break
		}

		if err := h.faceService.SetFace(face); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing face command")); writeErr != nil {
				return
			}
			break
		}
	}
}

// RotateHead
// @Summary Rotate the head of the vehicle
// @Description Receive two angles via WebSocket
// @Tags control
// @Accept json
// @Produce json
// @Param angle body model.HeadAngle true "Head angle"
// @Success 200 {string} string "OK"
// @Failure 400 {string} string "Error"
// @Router /v1/headAngle [get]
func (h *FaceHandler) RotateHead(c *websocket.Conn) {
	defer c.Close()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error reading message")); writeErr != nil {
				return
			}
			break
		}

		var angle model.HeadAngle
		if err := json.Unmarshal(message, &angle); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				return
			}
			break
		}

		if !h.faceService.IsValidAngle(angle) {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Invalid angle values")); writeErr != nil {
				return
			}
			break
		}

		if err := h.faceService.RotateHead(angle); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing head rotation command")); writeErr != nil {
				return
			}
			break
		}
	}
}
