package model

type VideoVariable int

type ConfVideo struct {
	Cmd           `json:"cmd"`
	VideoVariable `json:"data"`
}
