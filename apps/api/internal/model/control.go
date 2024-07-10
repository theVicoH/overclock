package model

type WheelSpeed [4]float32

type WheelRawData struct {
	X     float32 `json:"x"`
	Y     float32 `json:"y"`
	Force float32 `json:"force"`
}

type ConfWheelSpeed struct {
	Cmd        `json:"cmd"`
	WheelSpeed `json:"data"`
}
