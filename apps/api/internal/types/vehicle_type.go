package types

type VehicleType struct {
	Id   string `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	Name string `json:"name"`
}
