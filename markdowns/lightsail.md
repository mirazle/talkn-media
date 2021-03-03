# インスタンス作成

- CentOS を選択(月次料金 3.5\$を選択)
- リソース名：talknProdLiveMedia-root
- キー値タグ：env: prod, type: liveMedia, ch: /

## ネットワーキング　(静的 IP とインスタンスとグローバル IP の紐つけ)

- 作成したインスタンスを静的 IP に紐つける
- グローバルの DNS ゾーンと紐つける

## インスタンスのネットワーキング(iptable)

- 443(https)
- 10443(socket-io の https)
- 56789(SSH)

を解放

## DNS 基本設定

- A レコード @.talkn.io STATIC_IP_talknProdLiveMedia-root(34.235.113.17)
- A レコード \*.talkn.io STATIC_IP_talknProdLiveMedia-root(34.235.113.17)

# Setup SSL (SSH vLOGINED)

```
sudo su -
```

## 必要な yum を install

```
yum update -y
yum install epel-release -y
yum install certbot -y
yum install git -y
yum install gcc -y
yum install gcc-c++ -y
```

## step1 前提条件を満たす

- talkn.io ドメインを静的 IP にアタッチしターミナルで SSH アクセス
- ログインする`cecntos`ユーザーで`sudo vi /etc/ssh/sshd_config` で 22 ポートを 56789 に変更してサーバーを再起動して設定を反映。
- `sudo systemctl restart sshd`で sshd を再起動
- 22 ポートは Connection refused。
- 56789 はでアクセスを成功する事を確認。

- 接続時に Host key verification failed が出る場合は
  `ssh-keygen -R 34.235.113.17`
  `ssh-keygen -R news.talkn.io`
- もしくは
  `vi /Users/hmiyazaki/.ssh/known_hosts`
  で該当するドメインや IP のローカルの SSH 認証情報を削除する

- 下記でアクセス
  `ssh centos@news.talkn.io -i ~/Downloads/LightsailDefaultKey-us-east-1.pem -p56789`

## step2 Let's Encrypt の SSL ワイルドカード証明書をリクエストする

```
DOMAIN=news.talkn.io
echo $DOMAIN
certbot -d $DOMAIN --manual --preferred-challenges dns certonly
(\は削除して実行する)
```

- \_acme-challenge.talkn.io の DNS の TXT レコードが発行されるので
  Lightsail の「ネットワーキング」で「登録済みドメインの入力」に talkn.io で入力「DND ゾーンの作成」を押す。(作成済み)
- 実行したターミナルのコマンドは待機。ZONE ファイルで TXT レコードを追加し

`dig -t TXT _acme-challenge.news.talkn.io`

で変更を確認(変更されていなければ、TTL で設定してある時間待つ)

- 実行したターミナルのコマンドでエンターを押し

> IMPORTANT NOTES:
>
> - Congratulations! Your certificate and chain have been saved at:

と表示されれば成功。失敗する場合は ssl.md を参照。

手順参照)
https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-using-lets-encrypt-certificates-with-wordpressから抜粋

注意)

週に 5 回を超えると更新できなくなる(Duplicate Certificate limit of 5 per week)

> Renewals are treated specially: they don’t count against your Certificates per Registered Domain limit, but they are subject to a Duplicate Certificate limit of 5 per week. Note: renewals used to count against your Certificate per Registered Domain limit until March 2019, but they don’t anymore. Exceeding the Duplicate Certificate limit is reported with the error message too many certificates already issued for exact set of domains.

https://letsencrypt.org/docs/rate-limits/

## 管理ユーザ作成と認証機能有効化

https://qiita.com/tomy0610/items/f540150ac8acaa47ff66

# Swap 領域を確保

## 低スペック(512MB 程度)サーバーだと yarn でメモリエラーが発生する

`yarn install` `yarn run server`を実行する際に killed, crashed などのエラーが発生してしまうので、
swap 領域を確保して、実行メモリ領域を確保する。

下記のコマンドで swap 領域を確認する

```
free -m
```

```
dd if=/dev/zero of=/swap bs=1M count=1024
sudo mkswap /swap
chmod 0600 /swap
sudo swapon /swap
```

## fallocate 出なく dd を使用する理由

df -T で確認すると centos の/のファイルシステムが xfs であることが確認出来る。
xfs ファイルシステムは fallocate(ファイルレベル)での swap メモリ領域確保は許容されていない。
`swapon: 512MB.dat: swapon failed: Invalid argument`
というエラーが出るので swap メモリ領域確保は dd(物理ディスクレベル)で実行する。

# Node 環境 インストール

## nvm

```
git clone git://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm --version
```

- `source $HOME/.nvm/nvm.sh`を`~/.bash_profile`に追加しておく。
  (これをしないと再ログイン時に nvm が使用出来なくなる)

## Node

```
nvm install stable
node -v
npm -v
```

- `$HOME/.nvm/versions/node/v15.15.0/bin`の$PAHTが追加される(node -vのバージョンに変更)ので、
`~/.bash_profile`にも$PATH を通す
  (これをしないと再ログイン時に node, npm, yarn 等が使用出来なくなる)

## yarn

`npm install -g yarn`
`yarn -v`

# Github からソースを checkout

- 公開鍵を github の Setting->Deploy keys に追加

Title: talknProdLiveMedia-root
key: view の内容をペースト

```
ssh-keygen -t rsa -b 4096 -C "mirazle2069@gmail.com"
view /root/.ssh/id_rsa.pub
```

- チェックアウト

```
cd /usr/share/applications/
git clone git@github.com:mirazle/talkn-media.git
ln -s /usr/share/applications/talkn-media/ /root/talkn-media
cd /usr/share/applications/talkn

// iconvのインストールのために先にインストールしておく
yarn global add node-gyp
```
