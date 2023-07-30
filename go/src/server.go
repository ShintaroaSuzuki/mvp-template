package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-sql-driver/mysql"
	"graphql_server/graph"
	"graphql_server/graph/services"
	"graphql_server/internal"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	utc, err := time.LoadLocation("UTC")
	if err != nil {
		log.Fatal(err)
	}

	c := mysql.Config{
		DBName:               os.Getenv("MYSQL_DB_NAME"),
		User:                 os.Getenv("MYSQL_USER"),
		Passwd:               os.Getenv("MYSQL_PASSWORD"),
		Addr:                 os.Getenv("MYSQL_HOST"),
		Net:                  "tcp",
		ParseTime:            true,
		Collation:            "utf8mb4_unicode_ci",
		Loc:                  utc,
		AllowNativePasswords: true,
	}

	db, err := sql.Open("mysql", c.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	service := services.New(db)

	srv := handler.NewDefaultServer(internal.NewExecutableSchema(internal.Config{Resolvers: &graph.Resolver{
		Srv: service,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
