import fs from 'fs';
import path from 'path';

import { GetServerSideProps } from 'next';
import { ContentsType, ContentsValueType, ContentsValuesType } from 'schema';

import { MediaTypes, getNetwork } from 'utils/Networks';
import { validUrlParams } from 'utils/Sitemap';

const defaultMediaType = String(process.env['DEFAULT_MEDIA_TYPE']);
const defaultMktType = String(process.env['DEFAULT_MKT_TYPE']);
const defaultCategory = String(process.env['DEFAULT_CATEGORY']);
const defaultUrl = '';
const { endpoint, method, headers, count } = getNetwork(defaultMediaType as MediaTypes);
const requestOption = { method, headers };
const keepContentsSecond = Number(process.env.KEEP_CONTENTS_SECOND) * 1000;
const keepContentsCnt = Number(process.env['KEEP_CONTENTS_CNT']);

export type ReturnServiceType = { mktType: string; category: string; url: string; contents: ContentsValuesType };
export type InitComponentProps = ReturnServiceType;
export type UrlParamsType = { mktType: string; category: string; url: string };

class ContentsValues {
  constructor(
    public merged: ContentsValueType[] = [],
    public fetched: ContentsValueType[] = [],
    public saved: ContentsValueType[] = [],
  ) {}
}

class Requests {
  public mktType: string = defaultMktType;
  public category: string = defaultCategory;
  public url: string = defaultUrl;
  public isSame = false;
  constructor(query: UrlParamsType, referers: Referers) {
    if (query.mktType) this.mktType = query.mktType;
    if (query.category) this.category = query.category;
    if (query.url) this.url = query.url;
    this.isSame = this.mktType !== referers.mktType || this.category !== referers.category;
  }

  get fetchUrl() {
    const mktQuery = `mkt=${this.mktType}`;
    const categoryQery = this.category === defaultCategory ? '' : `&Category=${this.category}`;
    const countQuery = `&count=${count}`;
    return endpoint + mktQuery + categoryQery + countQuery;
  }
}

class Referers {
  public mktType = '';
  public category = '';
  constructor(referer: string) {
    const splitedReferer: string[] | [] = referer ? referer.split('/') : [];
    if (splitedReferer.length >= 3 && splitedReferer[2] !== '') {
      this.mktType = splitedReferer && splitedReferer[2];
    }
    if (splitedReferer.length >= 4 && splitedReferer[3] !== '') {
      this.category =
        splitedReferer && splitedReferer[3].indexOf('?') >= 0 ? splitedReferer[3].split('?')[0] : splitedReferer[4];
    }
  }
}

class Caches {
  static ext = 'json';
  public nowUnixtime: number;
  public filePath: string;
  public fileName?: string;
  constructor(requests: Requests, nowUnixtime: number) {
    this.nowUnixtime = nowUnixtime;
    this.filePath = `src/json/${defaultMediaType}/${requests.mktType}/${requests.category}/`;
    if (fs.existsSync(this.filePath)) {
      const files = fs.readdirSync(this.filePath);
      if (files.length > 0) {
        this.fileName = files[0];
      }
    }
  }

  get isExist(): boolean {
    return Boolean(this.fileName);
  }

  get fileFullName(): string {
    return this.fileName ? `${this.filePath}${this.fileName}` : ` ${this.filePath}${this.publishUnixtime}.${Caches.ext}`;
  }

  get publishUnixtime(): number {
    return this.fileName ? Number(this.fileName.replace('.json', '')) : this.nowUnixtime;
  }

  getFile() {
    return JSON.parse(fs.readFileSync(this.fileFullName, 'utf8')) as ContentsValuesType;
  }
}

export const getServerSidePropsWrap: GetServerSideProps<ReturnServiceType, UrlParamsType> = async ({ req, res, query }) => {
  const nowUnixtime = new Date().getTime();
  const contentsValues: ContentsValues = new ContentsValues();
  const referers = new Referers(String(req.headers.referer));
  const requests = new Requests(query as UrlParamsType, referers);
  const caches = new Caches(requests, nowUnixtime);
  let exeFetch = true;

  // redirect root if invalid url.
  if (validUrlParams(requests.mktType, requests.category)) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  console.log(1);
  if (requests.isSame) {
    console.log(2);
    if (caches.isExist) {
      console.log(3);
      contentsValues.saved = caches.getFile();
      exeFetch = nowUnixtime > caches.publishUnixtime + keepContentsSecond; // キャッシュファイル更新から、n時間経過している場合はfetchを実行する
    }

    if (exeFetch) {
      console.log(`FETCH ${requests.mktType} ${requests.category} ${count}`);
      const response: Response = await fetch(requests.fetchUrl, requestOption);
      if (response.status !== 200) throw `RESPONSE EROOR: ${response.status} ${requests.fetchUrl}`;

      const responseJson = (await response.json()) as ContentsType;
      contentsValues.fetched = responseJson.value;
      contentsValues.merged = saveContentsJson(requests, contentsValues, caches, nowUnixtime);
    }
  }

  if (contentsValues.merged.length === 0) {
    console.log(4);
    if (!caches.isExist) {
      console.log(5);
      contentsValues.saved = caches.getFile();
      exeFetch = nowUnixtime > caches.publishUnixtime + keepContentsSecond; // キャッシュファイル更新から、n時間経過している場合はfetchを実行する
    }
    console.log(`CACHE ${caches.fileFullName}`);
    contentsValues.merged = JSON.parse(fs.readFileSync(caches.fileFullName, { encoding: 'utf8' })) as ContentsValuesType;
  }

  requests.url = requests.url === '' && contentsValues.merged.length > 0 ? contentsValues.merged[0].url : requests.url;

  return {
    props: { ...requests, contents: contentsValues.merged },
  };
};

const saveContentsJson = (requests: UrlParamsType, contentsValue: ContentsValues, caches: Caches, nowUnixtime: number) => {
  contentsValue.merged = contentsValue.fetched;
  let existSavedContens = false;
  let existFetchedContens = false;

  if (contentsValue.saved.length > 0 && caches.filePath) {
    existSavedContens = true;
  }

  if (contentsValue.fetched.length > 0) {
    existFetchedContens = true;
  }

  if (existFetchedContens && existSavedContens) {
    const savedLastUnixtime = new Date(contentsValue.saved[0].datePublished).getTime();
    contentsValue.merged = contentsValue.saved;
    contentsValue.fetched.sort(sortContents);

    const addFetchContentsIndex = contentsValue.fetched.findIndex((value: ContentsValueType) => {
      const fetchedUnixtime = new Date(value.datePublished).getTime();
      return fetchedUnixtime < savedLastUnixtime;
    });
    const addFetchContents = contentsValue.fetched.slice(0, addFetchContentsIndex - 1);
    contentsValue.merged = addFetchContents.concat(contentsValue.merged);
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);

    const publishUnixtime = new Date(contentsValue.merged[0].datePublished).getTime();
    console.log(`UPDATE JSON fetchLast: ${publishUnixtime} saved: ${savedLastUnixtime}`);

    const removeFileFullName = String(caches.fileFullName);
    caches.fileName = `${publishUnixtime}.${Caches.ext}`;
    fs.writeFileSync(caches.fileFullName, JSON.stringify(contentsValue.merged));
    fs.unlinkSync(removeFileFullName);
  } else if (existFetchedContens && !existSavedContens) {
    console.log('FETCH CREATE JSON');
    caches.fileName = `${nowUnixtime}.${Caches.ext}`;
    contentsValue.fetched.sort(sortContents);
    contentsValue.merged = contentsValue.fetched;
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);
    setupFloders(requests);
    fs.writeFileSync(caches.fileFullName, JSON.stringify(contentsValue.merged));
  } else if (!existFetchedContens && existSavedContens) {
    console.log('NO FETCH');
    contentsValue.merged = contentsValue.saved;
  } else {
    console.log('NO FETCH NO SAVE FILE');
    caches.fileName = `${nowUnixtime}.${Caches.ext}`;
    contentsValue.merged = contentsValue.fetched;
    setupFloders(requests);
    fs.writeFileSync(caches.fileFullName, JSON.stringify(contentsValue.merged));
  }
  return contentsValue.merged;
};

const sortContents = (a: ContentsValueType, b: ContentsValueType) => {
  if (a.datePublished < b.datePublished) return 1;
  if (a.datePublished > b.datePublished) return -1;
  return 0;
};

const setupFloders = (requests: UrlParamsType) => {
  console.log(process.cwd());
  console.log(__dirname);
  console.log(__filename);
  console.log(path.resolve(__dirname));
  console.log(path.join(__dirname, 'src', 'json'));
  console.log(path.join(__filename, 'src', 'json'));
  setupFolder('json');
  setupFolder(`json/${defaultMediaType}`);
  setupFolder(`json/${defaultMediaType}/${requests.mktType}`);
  setupFolder(`json/${defaultMediaType}/${requests.mktType}/${requests.category}`);
  /*

  setupFolder('src/json');
  setupFolder(`src/json/${defaultMediaType}`);
  setupFolder(`src/json/${defaultMediaType}/${requests.mktType}`);
  setupFolder(`src/json/${defaultMediaType}/${requests.mktType}/${requests.category}`);

  setupFolder('/vercel/workpath0/json');
  setupFolder(`/vercel/workpath0/json/${defaultMediaType}`);
  setupFolder(`/vercel/workpath0/json/${defaultMediaType}/${requests.mktType}`);
  setupFolder(`/vercel/workpath0/json/${defaultMediaType}/${requests.mktType}/${requests.category}`);
*/
};

const setupFolder = (path: string) => {
  const exist = fs.existsSync(path);
  if (!exist) fs.mkdirSync(path);
};
