#バックエンド

## 目次

-   [gqlgen の導入](#intro-gqlgen)

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
