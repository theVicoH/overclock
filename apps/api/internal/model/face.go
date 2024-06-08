package model

type Face int

type HeadAngle [2]int

type ConfFace struct {
	Cmd  `json:"cmd"`
	Face `json:"data"`
}

type ConfHeadAngle struct {
	Cmd       `json:"cmd"`
	HeadAngle `json:"data"`
}
