package model

type BuzzerVariable [2]int

type ConfBuzzer struct {
	Cmd            `json:"cmd"`
	BuzzerVariable `json:"data"`
}
