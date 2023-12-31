package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
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

func (u *userService) GetUsers(ctx context.Context, limit int) ([]*model.User, error) {
	users, err := db.Users(
		qm.Select(db.UserTableColumns.ID, db.UserTableColumns.Name),
		qm.Limit(limit),
	).All(ctx, u.exec)
	if err != nil {
		return nil, err
	}
	return convertUserSlice(users), nil
}

func (u *userService) CreateUser(ctx context.Context, name string) (*model.User, error) {
	user := &db.User{
		ID:   uuid.New().String(),
		Name: name,
	}
	err := user.Insert(ctx, u.exec, boil.Infer())
	if err != nil {
		return nil, err
	}
	return convertUser(user), nil
}

func (u *userService) UpdateUser(ctx context.Context, id string, name string) (*model.User, error) {
	user, err := db.FindUser(ctx, u.exec, id)
	if err != nil {
		return nil, err
	}
	user.Name = name
	_, err = user.Update(ctx, u.exec, boil.Infer())
	if err != nil {
		return nil, err
	}
	return convertUser(user), nil
}

func (u *userService) DeleteUser(ctx context.Context, id string) (*model.User, error) {
	user, err := db.FindUser(ctx, u.exec, id)
	if err != nil {
		return nil, err
	}
	_, err = user.Delete(ctx, u.exec)
	if err != nil {
		return nil, err
	}
	return convertUser(user), nil
}

func (u *userService) ListUsersByID(ctx context.Context, IDs []string) ([]*model.User, error) {
	users, err := db.Users(
		qm.Select(db.UserTableColumns.ID, db.UserTableColumns.Name),
		db.UserWhere.ID.IN(IDs),
	).All(ctx, u.exec)
	if err != nil {
		return nil, err
	}
	return convertUserSlice(users), nil
}

func convertUserSlice(users db.UserSlice) []*model.User {
	result := make([]*model.User, 0, len(users))
	for _, user := range users {
		result = append(result, convertUser(user))
	}
	return result
}
