package handler

import (
	"Overclock/internal/model"
	"encoding/json"

	"github.com/gofiber/websocket/v2"
)

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
func (h *HeadAngleHandler) RotateHead(c *websocket.Conn) {
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

		if !h.headAngleService.IsValidAngle(angle) {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Invalid angle values")); writeErr != nil {
				return
			}
			break
		}

		if err := h.headAngleService.RotateHead(angle); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing head rotation command")); writeErr != nil {
				return
			}
			break
		}
	}
}
