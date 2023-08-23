#バックエンド

## 目次

- [gqlgen の導入](#intro-gqlgen)
- [デバッグ環境の構築](#debug-env)

<h2 id="intro-gqlgen">gqlgen の導入</h2>

### Go プロジェクトの作成

```shell
go mod init <module_name>
```

### `tools.go` の作成

```go
//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
)
```

### 依存関係の解決と GraphQL サーバーの生成

```
go mod tidy
go run github.com/99desings/gqlgen init
```

<h2 id="debug-env">デバッグ環境の構築</h2>

### MySQL, Redis コンテナの起動

```shell
docker compose up -d
```

### デバッグ用 GraphQL サーバーの起動

`go/src/.env.development` を使用して `go/src/server.go` を実行します。

詳しくは `go/src/Makefile` を参照してください。

```shell
cd go/src
make run
```
