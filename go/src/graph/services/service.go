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
}

type services struct {
	*userService
}

func New(exec boil.ContextExecutor) Services {
	return &services{
		userService: &userService{exec: exec},
	}
}
