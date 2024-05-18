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
			c.WriteMessage(websocket.TextMessage, []byte("Error reading message"))
			break
		}

		var speeds model.WheelSpeed
		if err := json.Unmarshal(message, &speeds); err != nil {
			c.WriteMessage(websocket.TextMessage, []byte("Error parsing message"))
			break
		}

		if !h.controlService.IsValidSpeed(speeds) {
			c.WriteMessage(websocket.TextMessage, []byte("Invalid speed values"))
			break
		}

		if err := h.controlService.Direction(speeds); err != nil {
			c.WriteMessage(websocket.TextMessage, []byte("Error processing control command"))
			break
		}
	}
}
