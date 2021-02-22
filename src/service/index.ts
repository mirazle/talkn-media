import { GetServerSideProps } from 'next';
import NodeCache from 'node-cache';
import { ContentsCacheType, ContentsType, ContentsValueType, ContentsValuesType } from 'schema';

import { MediaTypes, getNetwork } from 'utils/Networks';
import { validUrlParams } from 'utils/Sitemap';

const myCache = new NodeCache();
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

class MyCache {
  public key = '';
  public nowUnixtime: number;
  constructor(requests: Requests, nowUnixtime: number) {
    this.nowUnixtime = nowUnixtime;
    this.key = `json/${defaultMediaType}/${requests.mktType}/${requests.category}`;
  }

  get has(): boolean {
    return myCache.has(this.key);
  }

  set(contents: ContentsValuesType): boolean {
    const contentsCache: ContentsCacheType = { contents, generateUnixtime: this.nowUnixtime };
    return myCache.set(this.key, contentsCache, 36000);
  }

  get(): ContentsValuesType {
    const contentsCache = myCache.get(this.key) as ContentsCacheType;
    return contentsCache.contents;
  }

  getGenerateUnixtime(): number {
    if (this.has) {
      const contentsCache = myCache.get(this.key) as ContentsCacheType;
      return contentsCache.generateUnixtime;
    } else {
      return 0;
    }
  }
}

export const getServerSidePropsWrap: GetServerSideProps<ReturnServiceType, UrlParamsType> = async ({ req, res, query }) => {
  console.log('@@@ getServerSidePropsWrap @@@');
  const nowUnixtime = new Date().getTime();
  const contentsValues: ContentsValues = new ContentsValues();
  const referers = new Referers(String(req.headers.referer));
  const requests = new Requests(query as UrlParamsType, referers);
  const myCache = new MyCache(requests, nowUnixtime);
  let exeFetch = true;

  // redirect root if invalid url.
  if (validUrlParams(requests.mktType, requests.category)) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  console.log(1);
  if (requests.isSame) {
    console.log(2);
    if (myCache.has) {
      console.log(3);
      contentsValues.saved = myCache.get() as ContentsValueType[];
      exeFetch = nowUnixtime > myCache.getGenerateUnixtime() + keepContentsSecond; // キャッシュ更新から、n時間経過している場合はfetchを実行する
    }

    if (exeFetch) {
      console.log(`FETCH ${requests.mktType} ${requests.category} ${count}`);
      const response: Response = await fetch(requests.fetchUrl, requestOption);
      if (response.status !== 200) throw `RESPONSE EROOR: ${response.status} ${requests.fetchUrl}`;

      const responseJson = (await response.json()) as ContentsType;
      contentsValues.fetched = responseJson.value;
      contentsValues.merged = saveContentsProccess(contentsValues, myCache);
    }
  }

  if (contentsValues.merged.length === 0) {
    console.log(4);
    if (!myCache.has) {
      console.log(5);
      contentsValues.saved = myCache.get();
      exeFetch = nowUnixtime > myCache.getGenerateUnixtime() + keepContentsSecond; // キャッシュ更新から、n時間経過している場合はfetchを実行する
    }
    console.log(`CACHE ${myCache.key}`);
    contentsValues.merged = myCache.get();
  }

  requests.url = requests.url === '' && contentsValues.merged.length > 0 ? contentsValues.merged[0].url : requests.url;

  return {
    props: { ...requests, contents: contentsValues.merged },
  };
};

const saveContentsProccess = (contentsValue: ContentsValues, myCache: MyCache) => {
  contentsValue.merged = contentsValue.fetched;
  let existSavedContens = false;
  let existFetchedContens = false;

  if (contentsValue.saved.length > 0) {
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

    const generateUnixtime = new Date(contentsValue.merged[0].datePublished).getTime();
    console.log(`UPDATE CACHE fetchLast: ${generateUnixtime} saved: ${savedLastUnixtime}`);
    myCache.set(contentsValue.merged);
  } else if (existFetchedContens && !existSavedContens) {
    console.log('FETCH CREATE CACHE');
    contentsValue.fetched.sort(sortContents);
    contentsValue.merged = contentsValue.fetched;
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);
    myCache.set(contentsValue.merged);
  } else if (!existFetchedContens && existSavedContens) {
    console.log('NO FETCH');
    contentsValue.merged = contentsValue.saved;
  } else {
    console.log('NO FETCH & NO CACHE');
    contentsValue.merged = contentsValue.fetched;
    myCache.set(contentsValue.merged);
  }
  return contentsValue.merged;
};

const sortContents = (a: ContentsValueType, b: ContentsValueType) => {
  if (a.datePublished < b.datePublished) return 1;
  if (a.datePublished > b.datePublished) return -1;
  return 0;
};
