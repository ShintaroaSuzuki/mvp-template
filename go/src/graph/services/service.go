package services

import (
	"context"

	"github.com/volatiletech/sqlboiler/v4/boil"
	"graphql_server/graph/model"
)

type Services interface {
	UserService
}

type UserService interface {
	GetUser(ctx context.Context, id string) (*model.User, error)
	GetUsers(ctx context.Context, limit int) ([]*model.User, error)
	CreateUser(ctx context.Context, name string) (*model.User, error)
	UpdateUser(ctx context.Context, id string, name string) (*model.User, error)
	DeleteUser(ctx context.Context, id string) (*model.User, error)
	ListUsersByID(ctx context.Context, IDs []string) ([]*model.User, error)
}

type services struct {
	*userService
}

func New(exec boil.ContextExecutor) Services {
	return &services{
		userService: &userService{exec: exec},
	}
}
