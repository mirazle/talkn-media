import fs from 'fs';
import http from 'http';
import https from 'https';
import os from 'os';

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';

dotenv.config();

const env = process.env['ENVIROMENT'];
const isDev = env === 'development';
const homeDir = isDev ? os.homedir() : '/usr/share/applications';
const localhostPemKey = `${homeDir}/talkn-media/src/pems/server/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn-media/src/pems/server/localhost.crt`;
const productPemKey = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io/cert.pem';
const productPemChain = '/etc/letsencrypt/live/talkn.io/chain.pem';
const sslKey = isDev ? localhostPemKey : productPemKey;
const sslCrt = isDev ? localhostPemCrt : productPemCrt;
const sslChain = isDev ? '' : productPemChain;
const ports = isDev ? { HTTP: 3080, HTTPS: 3443 } : { HTTP: 80, HTTPS: 443 };
const sslOptions = isDev
  ? { key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCrt) }
  : {
      key: fs.readFileSync(sslKey),
      cert: fs.readFileSync(sslCrt),
      ca: fs.readFileSync(sslChain),
    };
const app = next({ dev: isDev });
const handle = app.getRequestHandler();
const httpApp = express();
const httpsApp = express();
const routingHttp = (req: Request, res: Response): void => res.redirect(`https://${req.hostname}:${ports.HTTPS}${req.url}`);
const listenedHttp = (): void => console.log('listened Http');
const listenedHttps = (): void => console.log('listened Https');
const routingHttps = (req: Request, res: Response) => {
  /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
  ((): Promise<void> => handle(req, res))();
};

export default (async (): Promise<void> => {
  try {
    await app.prepare();
    http.createServer(httpApp.all('*', routingHttp)).listen(ports.HTTP, listenedHttp);
    https.createServer(sslOptions, httpsApp.all('*', routingHttps)).listen(ports.HTTPS, listenedHttps);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  return Promise.resolve();
})();
