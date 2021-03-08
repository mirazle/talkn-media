// import fs from 'fs';
import http from 'http';
// import https from 'https';
// import os from 'os';

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';

dotenv.config();

const env = process.env['ENVIROMENT'];
const isDev = env === 'development';
/*
const homeDir = isDev ? os.homedir() : '/usr/share/applications';
const localhostPemKey = `${homeDir}/talkn-media/src/pems/server/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn-media/src/pems/server/localhost.crt`;
const productPemKey = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io/cert.pem';
const productPemChain = '/etc/letsencrypt/live/talkn.io/chain.pem';
*/
/*
const sslKey = isDev ? localhostPemKey : productPemKey;
const sslCrt = isDev ? localhostPemCrt : productPemCrt;
const sslChain = isDev ? '' : productPemChain;
*/
const ports = isDev ? { HTTP: 80, HTTPS: 443 } : { HTTP: 80, HTTPS: 443 };
/*
const sslOptions = isDev
  ? { key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCrt) }
  : {
      key: fs.readFileSync(sslKey),
      cert: fs.readFileSync(sslCrt),
      ca: fs.readFileSync(sslChain),
    };
*/
const nextServer = next({ dev: false });
const handle = nextServer.getRequestHandler();
const httpApp = express();
// const httpsApp = express();
const listenedHttp = (): void => console.log('listened Http');
// const listenedHttps = (): void => console.log('listened Https');
const routingHttp = (req: Request, res: Response): void => {
  if (req.originalUrl === '/health') {
    res.statusCode = 200;
    res.send('');
    res.end();
  } else {
    switch (req.originalUrl) {
      case '/service.worker.js':
      case '/favicon.ico':
        res.sendFile(`/usr/local/src/talkn-media/src/assets${req.originalUrl}`);
        break;
      default:
        /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
        ((): Promise<void> => handle(req, res))();
    }
  }
};
/*
const routingHttps = (req: Request, res: Response) => {
  console.log('@@@ ACCESS HTTPS');
  console.log(req.url);
  ((): Promise<void> => handle(req, res))();
};
*/
export default (async (): Promise<void> => {
  try {
    await nextServer.prepare();
    http.createServer(httpApp.all('*', routingHttp)).listen(ports.HTTP, listenedHttp);
    // https.createServer(sslOptions, httpsApp.all('*', routingHttps)).listen(ports.HTTPS, listenedHttps);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  return Promise.resolve();
})();
