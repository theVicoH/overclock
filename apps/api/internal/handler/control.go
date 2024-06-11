package handler

import (
	"Overclock/internal/model"
	"encoding/json"

	"github.com/gofiber/websocket/v2"
)

// ManualControl
// @Summary Control the vehicle manually
// @Description Receive manual control commands via WebSocket
// @Tags control
// @Accept json
// @Produce json
// @Param speeds body model.WheelSpeed true "Wheel Speeds"
// @Success 200 {string} string "OK"
// @Failure 400 {string} string "Error"
// @Router /v1/control/manual [get]
func (h *ControlHandler) ManualControl(c *websocket.Conn) {
	defer c.Close()
	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error reading message")); writeErr != nil {
				sendResponse(c, "Error", "Error reading message")

				return
			}
			break
		}

		var speeds model.WheelSpeed
		if err := json.Unmarshal(message, &speeds); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				sendResponse(c, "Error", "Error parsing message")

				return
			}
			break
		}

		if !h.controlService.IsValidSpeed(speeds) {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Invalid speed values")); writeErr != nil {
				sendResponse(c, "Error", "Invalid Wheel values")

				return
			}
			break
		}

		if err := h.controlService.Direction(speeds); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing control command")); writeErr != nil {
				sendResponse(c, "Error", "Error processing control command")

				return
			}
			break
		}
		sendResponse(c, "OK", "ManualControl command processed successfully")

	}
}
