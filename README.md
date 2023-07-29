# mvp-template

-   [ローカルでの確認環境の構築](#local-exec)

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
