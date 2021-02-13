import fs from 'fs';
import http from 'http';
import https from 'https';
import os from 'os';

import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';

// import Geolite from 'utils/Geolite';

const env = process.env['ENVIROMENT'];
const sessionSetting = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'lax',
  },
});

const ports = {
  HTTP: 80,
  HTTPS: 443,
};

const homeDir = env === 'development' ? os.homedir() : '/usr/share/applications';
const localhostPemKey = `${homeDir}/talkn-media/src/pems/server/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn/-mediac/pems/server/localhost.crt`;
const productPemKey = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io/cert.pem';
const productPemChain = '/etc/letsencrypt/live/talkn.io/chain.pem';
const sslKey = env === 'development' ? localhostPemKey : productPemKey;
const sslCrt = env === 'development' ? localhostPemCrt : productPemCrt;
const sslChain = env === 'development' ? '' : productPemChain;

const sslOptions =
  env === 'development'
    ? { key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCrt) }
    : {
        key: fs.readFileSync(sslKey),
        cert: fs.readFileSync(sslCrt),
        ca: fs.readFileSync(sslChain),
      };

class ExpressProxy {
  httpApp: Express;
  httpsApp: Express;
  session: any;
  constructor() {
    this.listenedHttp = this.listenedHttp.bind(this);
    this.routingHttp = this.routingHttp.bind(this);

    this.httpApp = express();
    this.httpApp.use(sessionSetting);
    this.httpsApp = express();
    this.httpsApp.set('trust proxy', true);
    this.httpsApp.use(bodyParser.urlencoded({ extended: true }));
    this.httpsApp.use(compression());
    this.httpsApp.use(sessionSetting);

    // this.session = new Session(this.httpsApp);
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer(): void {
    const routingHttp = () => console.log('routingHttp');
    const listenedHttp = () => console.log(`@@@ LISTEN HTTP ${ports.HTTP}`);
    http.createServer(this.httpApp.all('*', routingHttp)).listen(ports.HTTP, listenedHttp);
  }

  routingHttp(req: Request, res: Response): void {
    res.redirect(`https://${req.hostname}${req.url}`);
  }

  listenedHttp(): void {
    console.log('listenedHttp');
  }

  /***************************/
  /* HTTPS                   */
  /***************************/

  createHttpsServer(): void {
    const routingHttps = () => console.log('routingHttps');
    const listenedHttps = () => console.log(`@@@ LISTEN HTTPS ${ports.HTTPS}`);
    https.createServer(sslOptions, this.httpsApp.all('*', routingHttps)).listen(ports.HTTPS, listenedHttps);
  }
}

export default ExpressProxy;
