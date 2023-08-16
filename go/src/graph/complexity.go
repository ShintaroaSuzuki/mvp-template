package graph

import (
	"graphql_server/internal"
)

func ComplexityConfig() internal.ComplexityRoot {
	var c internal.ComplexityRoot

	c.Query.User = func(childComplexity int, id string) int {
		return 1
	}
	return c
}
