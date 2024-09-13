package types

import (
	"github.com/google/uuid"
)

type VehicleType struct {
	Id   uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	Name string    `json:"name"`
}

func (VehicleType) TableName() string {
	return "vehicle"
}
