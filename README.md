# mvp-template

- [ローカルでの確認環境の構築](#local-exec)
- [ChatGPT によるコードレビュー](#ai-review)
- [direnv のインストール](#install-direnv)
- [terraform のインストール](#install-terraform)
- [prettier のインストール](#install-prettier)

<h2 id="local-exec">ローカルでの確認環境の構築</h2>

Docker Compose でコンテナを立ち上げれば、アプリケーションの動作環境が構築できます。

```shell
$ docker compose up -d
```

コンテナの停止および削除には、下記のコマンドを実行してください。

```shell
$ docker compose down
```

ビルドイメージごと削除するには `--rmi all` のオプションを追加してください。

```shell
$ docker compose down --rmi all
```

<h2 id="ai-review">ChatGPT によるコードレビュー</h2>

[ai-pr-reviewer](https://github.com/coderabbitai/ai-pr-reviewer) を利用して、PR 作成時に ChatGPT にコードレビューをさせています。

GitHub Secrets に `OPENAI_API_KEY` を登録する必要があります。

(API Keys - OPENAI API)[https://platform.openai.com/account/api-keys] から API キーの発行ができます。

<h2 id="install-direnv">direnv のインストール</h2>

<!-- direnv をなぜ使うのか -->
<!-- .pre-commit の内容を変更したら再度 `direnv allow` を実行する必要がある -->

```
brew install direnv
```

<h2 id="install-terraform">terraform のインストール</h2>

<!-- terraform をなぜ使うのか -->

```
brew install terraform
```

<h2 id="install-prettier">prettier のインストール</h2>

<!-- prettier をなぜ使うのか -->

```
brew install prettier
```
