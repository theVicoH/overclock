package model

type BuzzerVariable int

type ConfBuzzer struct {
	Cmd            `json:"cmd"`
	BuzzerVariable `json:"data"`
}
