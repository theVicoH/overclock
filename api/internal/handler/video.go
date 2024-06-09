package handler

import (
	"Overclock/internal/model"
	"encoding/json"

	"github.com/gofiber/websocket/v2"
)
// VideoVariableControl
// @Summary ON/OFF Video 
// @Description Receive video ON/OFF instruction via WebSocket
// @Tags control
// @Accept json
// @Produce json
// @Param VideoVariable body model.VideoVariable true "VideoVariable"
// @Success 200 {string} string "OK"
// @Failure 400 {string} string "Error"
// @Router /v1/video [get]
func (h *VideoVariableHandler) VideoVariable(c *websocket.Conn){
	defer c.Close()

	for {
		_, message,err := c.ReadMessage()
        if err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error reading message")); writeErr != nil {
				return
			}
			break
		}
		var videoControl model.VideoVariable
		if err := json.Unmarshal(message, &videoControl); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error parsing message")); writeErr != nil {
				return
			}
			break
		}
		if !h.videoService.IsValideVideoVariable(videoControl){
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("invalide videoVariable value")); writeErr!= nil {
				return
			}
			break
		}
		if err := h.videoService.SetVideoVariable(videoControl); err != nil {
			if writeErr := c.WriteMessage(websocket.TextMessage, []byte("Error processing face command")); writeErr != nil {
				return
			}
			break
		}
	}	
}
