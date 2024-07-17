package config

type DBConfig struct {
	DBUsername string
	DBPassword string
	DBHost     string
	DBName     string
}

type BrokerConfig struct {
	BRUsername string
	BRPassword string
	BRHost     string
}

func LoadDBConfig() *DBConfig {
	return &DBConfig{
		DBUsername: "root",
		DBPassword: "root",
		DBHost:     "localhost",
		DBName:     "race",
	}
}

func LoadBRConfig() *BrokerConfig {
	return &BrokerConfig{
		BRUsername: "",
		BRPassword: "",
		BRHost:     "",
	}
}
