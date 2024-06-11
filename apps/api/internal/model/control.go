package model

type WheelSpeed [4]int

type ConfWheelSpeed struct {
	Cmd        `json:"cmd"`
	WheelSpeed `json:"data"`
}
