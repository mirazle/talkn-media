import http from 'http';

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';

dotenv.config();

const env = process.env['ENVIROMENT'];
const isDev = env === 'development';
const ports = isDev ? { HTTP: 80, HTTPS: 443 } : { HTTP: 80, HTTPS: 443 };
const nextServer = next({ dev: false });
const handle = nextServer.getRequestHandler();
const httpApp = express();
const listenedHttp = (): void => console.log('listened Http');
const routingHttp = (req: Request, res: Response): void => {
  // Lightsail health check endpoint.
  if (req.originalUrl === '/health') {
    res.statusCode = 200;
    res.send('');
    res.end();
  } else {
    switch (req.originalUrl) {
      case '/sitemap.xml':
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
