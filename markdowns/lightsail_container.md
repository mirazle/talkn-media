# 事前準備

## aws CLI の準備

$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg AWSCLIV2.pkg -target /

$ aws --version
aws-cli/2.1.1 Python/3.7.4 Darwin/19.6.0 exe/x86_64

## Lightsail Control プラグイン

$ sudo curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/darwin-amd64/lightsailctl" -o "/usr/local/bin/lightsailctl"
$ sudo chmod +x /usr/local/bin/lightsailctl
$ xattr -c /usr/local/bin/lightsailctl

## aws iam (権限)解決

予め Lightsail 関連にアクセス出来るポリシーを作成し、適切なグループ及びユーザーにアタッチしておく必要がある

https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-managing-access-for-an-iam-user#create-an-iam-policy-for-lightsail-access

# Dockerfile 作成 & .dockerignore 作成

## Dockerfile

```
FROM node:14.4.0-alpine
WORKDIR /usr/local/src/talkn-media/
COPY . .
RUN yarn install && yarn -v && node --version && yarn build
EXPOSE 80
CMD [ "yarn", "server" ]
```

## .dockerignore

```
node_modules
.git
```

# Lightsail Container に push

## Lightsail にコンテナ保持領域を確保

aws lightsail create-container-service --service-name talkn-live-media --power micro --scale 1

## Dokcer イメージ作成

docker build . -t mirazle/talkn-live-media

## Dokcer をローカルで実行して動作確認

docker run -it --rm -p 80:80 mirazle/talkn-live-media

## Lightsail のコンテナ保持領域に Docker イメージを push

aws lightsail push-container-image --service-name talkn-live-media --label node --image mirazle/talkn-live-media:latest

# Lightsail Container を deploy(公開)

```
コンテナ名： 任意のコンテナ名
イメージ： pushしたイメージを選択
ポート：80 HTTP
パブリックエンドポイント(LBから見たコンテナのエンドポイントを指定)
    コンテナ名：名任意のコンテナ名
    ポート：80
    ヘルスチェック： /health
```

「保存とデプロイ」を押す

# Lightsail Container にドメイン割り当て

## SSL 証明書を作成

「カスタムドメイン」から「証明書書を作成」し

```
プライマリドメイン：talkn.io
証明書の名前：talkn.io-1(任意)
代替ドメイン及びサブドメイン：news.talkn.io
```

「作成」を押し、表示される CNAME 情報をメモしておく

## DNS 解決

Lightsail ホームから「ネットワーク」からグローバルで作成済みの「talkn.io」を選択し
「＋レコードの追加」で表示された CNAME 情報を追加していく。
\*.talkn.io で基本的なサブドメイン指定のレコードを作成してしまっているので、
別途 CNAME レコードで`news.talkn.io` `コンテナのデフォルト公開ドメイン`で紐付けをする必要がある

# 本番アクセス

news.talkn.io にアクセス

# 使用コマンド

## デプロイ

```
docker images
docker rmi 8839
docker build . -t mirazle/talkn-live-media
aws lightsail push-container-image --service-name talkn-live-media --label node --image mirazle/talkn-live-media:latest
```

## 起動 & ローカルログイン

```
docker run -p 80:80 c1ac80efc51b
docker run -p 80:80 -it c1ac80efc51b /bin/bash
```

```
全コンテナ停止: docker stop $(docker ps -q)
全コンテナ削除: docker rm $(docker ps -q -a)
全イメージ削除: docker rmi $(docker images -q)
```
