package types

type VehicleType struct {
	Id   string `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	Name string `json:"name"`
}

type RequestTypeVehicle struct {
	Data VehicleUpdateType
}

type VehicleUpdateType struct {
	Name string `json:"name"`
}
