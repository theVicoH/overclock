package handler

import (
	"Overclock/internal/model"
	"encoding/json"
	"fmt"

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

		var rowData model.WheelRawData
		if err := json.Unmarshal(message, &rowData); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				sendResponse(c, "Error", "Error parsing message")
				fmt.Printf("x: %f\n, y: %f\n, force: %f\n", rowData.X, rowData.Y, rowData.Force)
				return
			}
			break
		}

		var wheelSpeed model.WheelSpeed

		wheelSpeed, ok := h.controlService.TransformRawData(rowData)

		if !ok {
			fmt.Println("!ok", ok)
			sendResponse(c, "Value repeated", "ManualControl command not processed")

		} else {
			if err := h.controlService.Direction(wheelSpeed); err != nil {
				if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing control command")); writeErr != nil {
					sendResponse(c, "Error", "Error processing control command")

					return
				}
				break
			}

			sendResponse(c, "OK", "ManualControl command processed successfully")
		}

	}
}
