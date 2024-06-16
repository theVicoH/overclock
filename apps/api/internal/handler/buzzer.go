package handler

import (
	"Overclock/internal/model"
	"encoding/json"

	"github.com/gofiber/websocket/v2"
)

// BuzzerVariableControl
// @Summary ON/OFF buzzer and frequency control
// @Description Receive  buzzer frequency via WebSocket
// @Tags control
// @Accept json
// @Produce json
// @Param buzzerVariable body model.BuzzerVariable true "buzzerVariable"
// @Success 200 {string} string "OK"
// @Failure 400 {string} string "Error"
// @Router /v1/buzzer/alarm [get]
func (h *BuzzerHandler) BuzzerVariableControl(c *websocket.Conn) {
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

		var buzzerVariable model.BuzzerVariable
		if err := json.Unmarshal(message, &buzzerVariable); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				sendResponse(c, "Error", "Error parsing message")
				return
			}
			break
		}
		if !h.buzzerService.IsValidBuzzerVariable(buzzerVariable) {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Invalid BuzzerVariable values")); writeErr != nil {
				sendResponse(c, "Error", "Invalid BuzzerVariable values")
				return
			}
			break
		}
		if err := h.buzzerService.SetBuzzerVariable(buzzerVariable); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing Buzzer value")); writeErr != nil {
				sendResponse(c, "Error", "Invalid BuzzerVariable values")
				return
			}
			break
		}

	}
}
