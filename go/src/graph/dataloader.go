package graph

import (
	"context"
	"encoding/json"
	"errors"

	"os"
	"time"

	"graphql_server/graph/model"
	"graphql_server/graph/services"

	"github.com/graph-gophers/dataloader/v7"
	goredis "github.com/redis/go-redis/v9"
)

type Loaders struct {
	UserLoader dataloader.Interface[string, *model.User]
}

func NewLoaders(Srv services.Services) *Loaders {
	redisClient := goredis.NewClient(&goredis.Options{
		Addr:     os.Getenv("REDIS_HOST"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})

	userBatcher := &userBatcher{
		Srv:   Srv,
		Redis: redisClient,
		TTL:   time.Minute,
	}

	userLoader := dataloader.NewBatchedLoader[string, *model.User](userBatcher.BatchGetUsers)

	return &Loaders{
		UserLoader: userLoader,
	}
}

type userBatcher struct {
	Srv   services.Services
	Redis *goredis.Client
	TTL   time.Duration
}

func (u *userBatcher) BatchGetUsers(ctx context.Context, IDs []string) []*dataloader.Result[*model.User] {
	results := make([]*dataloader.Result[*model.User], len(IDs))

	values, _ := u.Redis.MGet(ctx, IDs...).Result()

	var cachedMissIDs map[string]int
	for i := range IDs {
		if values[i] == nil {
			if cachedMissIDs == nil {
				cachedMissIDs = make(map[string]int, len(IDs))
			}
			cachedMissIDs[IDs[i]] = i
			results[i] = &dataloader.Result[*model.User]{
				Error: errors.New("not found"),
			}
		} else {
			user := &model.User{}
			err := json.Unmarshal([]byte(values[i].(string)), user)
			if err != nil {
				results[i] = &dataloader.Result[*model.User]{
					Error: err,
				}
			} else {
				results[i] = &dataloader.Result[*model.User]{
					Data: user,
				}
			}
		}
	}

	if len(cachedMissIDs) == 0 {
		return results
	}

	IDs = make([]string, 0, len(cachedMissIDs))
	for id := range cachedMissIDs {
		IDs = append(IDs, id)
	}

	users, err := u.Srv.ListUsersByID(ctx, IDs)
	for _, user := range users {
		var rsl *dataloader.Result[*model.User]
		if err != nil {
			rsl = &dataloader.Result[*model.User]{
				Error: err,
			}
		} else {
			rsl = &dataloader.Result[*model.User]{
				Data: user,
			}
		}
		marshaled, _ := json.Marshal(user)
		u.Redis.Set(ctx, user.ID, marshaled, u.TTL)
		results[cachedMissIDs[user.ID]] = rsl
	}
	return results
}
