# aws CLI の準備

$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg AWSCLIV2.pkg -target /

$ aws --version
aws-cli/2.1.1 Python/3.7.4 Darwin/19.6.0 exe/x86_64

# Lightsail Control プラグイン

$ sudo curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/darwin-amd64/lightsailctl" -o "/usr/local/bin/lightsailctl"
$ sudo chmod +x /usr/local/bin/lightsailctl
$ xattr -c /usr/local/bin/lightsailctl

# aws iam 解決

予め Lightsail 関連にアクセス出来るポリシーを作成し、適切なグループ及びユーザーにアタッチしておく必要がある

https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-managing-access-for-an-iam-user#create-an-iam-policy-for-lightsail-access

# Lightsail にコンテナ作成

$ aws lightsail create-container-service --service-name talkn-live-media --power micro --scale 1

# Lightsail にイメージを push

## タグ付け

$ docker tag talkn-live-media mirazle/talkn-live-media

$ aws lightsail push-container-image --service-name talkn-live-media --image mirazle/talkn-live-media:latest --label node

$ aws lightsail get-container-images --service-name talkn-live-media

# デプロイ用の設定ファイルを作成

lightsail_container.json

```
{
   "containers": {
       "talkn-live-media": {
         "image": ":talkn-live-media.node.1",
         "environment": {
             "NODE_ENV": "production"
           },
           "ports": {
               "3000": "HTTP"
           }
       }
   },
   "publicEndpoint": {
       "containerName": "talkn-live-media",
       "containerPort": 3000,
       "healthCheck": {
          "healthyThreshold": 2,
          "unhealthyThreshold": 2,
          "timeoutSeconds": 3,
          "intervalSeconds": 5,
          "path": "/",
          "successCodes": "200"
       }
   }
}
```

# デプロイ

​$ aws lightsail create-container-service-deployment --service-name talkn-live-media --cli-input-json file://$(pwd)/lightsail_container.json

## 確認（state が Deployed になったら完了）

$ aws lightsail get-container-service-deployments --service-name talkn-live-media
