package services

import (
	"context"

	"github.com/volatiletech/sqlboiler/v4/boil"
	"graphql_server/graph/db"
	"graphql_server/graph/model"
)

type userService struct {
	exec boil.ContextExecutor
}

func convertUser(user *db.User) *model.User {
	return &model.User{
		ID:   user.ID,
		Name: user.Name,
	}
}

func (u *userService) GetUser(ctx context.Context, id string) (*model.User, error) {
	user, err := db.FindUser(
		ctx,
		u.exec,
		id,
		db.UserTableColumns.ID,
		db.UserTableColumns.Name,
	)
	if err != nil {
		return nil, err
	}
	return convertUser(user), nil
}
