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

class Monitor {
  protected isLogging = false;
}

class ContentsValues {
  constructor(
    public merged: ContentsValueType[] = [],
    public fetched: ContentsValueType[] = [],
    public cached: ContentsValueType[] = [],
  ) {}
}

class Requests extends Monitor {
  public mktType: string = defaultMktType;
  public category: string = defaultCategory;
  public url: string = defaultUrl;
  public isSame = false;
  public fetched = false;
  constructor(query: UrlParamsType, referers: Referers) {
    super();
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

  async fetch(): Promise<ContentsType> {
    console.log(`EXE FETCH ${this.mktType} ${this.category} ${count}`);
    const response: Response = await fetch(this.fetchUrl, requestOption);
    if (response.status !== 200) throw `RESPONSE EROOR: ${response.status} ${this.fetchUrl}`;
    this.fetched = true;
    return (await response.json()) as ContentsType;
  }
}

class Referers extends Monitor {
  public mktType = '';
  public category = '';
  constructor(referer: string) {
    super();
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

class MyCache extends Monitor {
  public key = '';
  public nowUnixtime: number;
  constructor(requests: Requests, nowUnixtime: number) {
    super();
    this.nowUnixtime = nowUnixtime;
    this.key = `json/${defaultMediaType}/${requests.mktType}/${requests.category}`;
  }

  get has(): boolean {
    return myCache.has(this.key);
  }

  // キャッシュ更新から、n時間経過している場合はfetchを実行して連結する
  get isRequireConcat(): boolean {
    if (this.isLogging) {
      console.log(new Date(this.nowUnixtime));
      console.log(new Date(this.generateUnixtime));
      console.log(new Date(this.generateUnixtime + keepContentsSecond));
      console.log(this.nowUnixtime > this.generateUnixtime + keepContentsSecond);
    }
    return this.nowUnixtime > this.generateUnixtime + keepContentsSecond;
  }

  get generateUnixtime(): number {
    if (this.has) {
      const contentsCache = myCache.get(this.key) as ContentsCacheType;
      return contentsCache.generateUnixtime;
    } else {
      return 0;
    }
  }

  set(contents: ContentsValuesType): boolean {
    const contentsCache: ContentsCacheType = { contents, generateUnixtime: this.nowUnixtime };
    return myCache.set(this.key, contentsCache, 36000);
  }

  get(): ContentsValuesType {
    const contentsCache = myCache.get(this.key) as ContentsCacheType;
    return contentsCache.contents;
  }
}

export const getServerSidePropsWrap: GetServerSideProps<ReturnServiceType, UrlParamsType> = async ({ req, res, query }) => {
  const nowUnixtime = new Date().getTime();
  let contentsValues: ContentsValues = new ContentsValues();
  const referers = new Referers(String(req.headers.referer));
  const requests = new Requests(query as UrlParamsType, referers);
  const myCache = new MyCache(requests, nowUnixtime);

  // redirect root if invalid url.
  if (validUrlParams(requests.mktType, requests.category)) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return {
      props: { ...requests, contents: [] },
    };
  }

  if (myCache.has) {
    contentsValues.cached = myCache.get() as ContentsValueType[];
    contentsValues.merged = contentsValues.cached;

    if (myCache.isRequireConcat) {
      contentsValues = await fetchProcess(requests, contentsValues, myCache);
    }
  } else {
    contentsValues = await fetchProcess(requests, contentsValues, myCache);
  }

  requests.url = requests.url === '' && contentsValues.merged.length > 0 ? contentsValues.merged[0].url : requests.url;

  console.log(`@@@ getServerSidePropsWrap @@@ ${myCache.key} ${contentsValues.merged.length} ${String(myCache.has)}`);

  return {
    props: { ...requests, contents: contentsValues.merged },
  };
};

const fetchProcess = async (requests: Requests, contentsValues: ContentsValues, myCache: MyCache): Promise<ContentsValues> => {
  const responseJson = await requests.fetch();
  contentsValues.fetched = responseJson.value;
  contentsValues.merged = saveContentsSwitch(contentsValues, myCache);
  contentsValues.cached = contentsValues.merged;
  return contentsValues;
};

const saveContentsSwitch = (contentsValue: ContentsValues, myCache: MyCache) => {
  contentsValue.merged = contentsValue.fetched;
  let existCachedContents = false;
  let existFetchedContens = false;
  if (contentsValue.cached.length > 0) existCachedContents = true;
  if (contentsValue.fetched.length > 0) existFetchedContens = true;

  // fetch成功してcacheが存在してた場合 -> 連結&ソートして返す
  if (existFetchedContens && existCachedContents) {
    const cachedLastUnixtime = new Date(contentsValue.cached[0].datePublished).getTime();
    contentsValue.merged = contentsValue.cached;
    contentsValue.fetched.sort(sortContents);

    const addFetchContentsIndex = contentsValue.fetched.findIndex((value: ContentsValueType) => {
      const fetchedUnixtime = new Date(value.datePublished).getTime();
      return fetchedUnixtime < cachedLastUnixtime;
    });
    const addFetchContents = contentsValue.fetched.slice(0, addFetchContentsIndex - 1);
    contentsValue.merged = addFetchContents.concat(contentsValue.merged);
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);

    console.log(`> UPDATE( CONCAT & SORT ) CACHE fetchLast: ${myCache.generateUnixtime}`);
    myCache.set(contentsValue.merged);
  } else if (existFetchedContens && !existCachedContents) {
    console.log('> CREATE NEW CACHE');
    contentsValue.fetched.sort(sortContents);
    contentsValue.merged = contentsValue.fetched;
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);
    myCache.set(contentsValue.merged);
  } else if (!existFetchedContens && existCachedContents) {
    console.log('> NO FETCH & BACK CACHE');
    contentsValue.merged = contentsValue.cached;
  } else {
    console.log('> NO FETCH & NO CACHE');
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
