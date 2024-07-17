package types

import "database/sql"

type DbStruct struct {
	*sql.DB
}
