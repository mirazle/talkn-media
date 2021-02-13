export {};
/*
import fs from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentsType } from 'schema';
import { Value } from 'schema/News';
import { fetchContents } from 'service';

import { MediaTypes, getNetwork } from 'utils/Networks';

const mediaType = process.env['DEFAULT_MEDIA_TYPE'] as MediaTypes;
const defaultMktype = process.env['DEFAULT_MKT_TYPE'] || '';
const network = getNetwork(mediaType);
const keepContentsSecond = Number(process.env.KEEP_CONTENTS_SECOND) * 1000;
const keepContentsCnt = Number(process.env['KEEP_CONTENTS_CNT']);

// devでホットリロードの度に外部apiが実行されてしまい、
// 都度課金されてしまうのでISRと同じ時間間隔でキャッシュ(保存しておいたファイル)を返す。
// また1度取得したjsonを連結して返す必要(最新のレスポンス1回分を返すのはユーザーからすると不自然)があるのでISRでなく、自前で実装。
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  let exeFetch = true;
  let cacheFileFullname = '';
  let returnContents: ContentsType;
  let fetchedContents: ContentsType;
  let savedContents = undefined;

  const nowUnixtime = new Date().getTime();
  const mktType = req.query.mkt ? String(req.query.mkt) : defaultMktype;
  const category = req.query.Category ? String(req.query.Category) : '';
  const count = req.query.count ? Number(req.query.count) : network.count;
  const cacheFilePath = getCacheFilePath(mediaType, mktType, category);

  if (fs.existsSync(cacheFilePath)) {
    const files = fs.readdirSync(cacheFilePath);
    if (files.length > 0) {
      cacheFileFullname = String(`${cacheFilePath}${files[0]}`);
      savedContents = JSON.parse(fs.readFileSync(cacheFileFullname, 'utf8')) as ContentsType;
      const lastPublishedUnixtime = Number(files[0].replace('.json', ''));

      // キャッシュファイル更新から、n時間経過している場合はfetchを実行する
      exeFetch = nowUnixtime > lastPublishedUnixtime + keepContentsSecond;
    }
  }

  if (exeFetch) {
    console.log(`FETCH ${mktType} ${category} ${count}`);
    fetchedContents = await fetchContents(mktType, category, count, true);
    returnContents = saveContentsJson(
      mktType,
      category,
      cacheFilePath,
      nowUnixtime,
      cacheFileFullname,
      fetchedContents,
      savedContents,
    );
  } else {
    console.log(`CACHE ${cacheFileFullname}`);
    const cacheFile = fs.readFileSync(cacheFileFullname, { encoding: 'utf8' });
    returnContents = (cacheFile as unknown) as ContentsType;
  }
  res.status(200).json(returnContents);
};

const saveContentsJson = (
  mktType: string,
  _category: string,
  cacheFilePath: string,
  nowUnixtime: number,
  cacheFileFullname: string,
  fetchedContents: ContentsType,
  _savedContents?: ContentsType,
): ContentsType => {
  let returnContents: ContentsType = fetchedContents;
  let existSavedContens = false;
  let existFetchedContens = false;
  let saveFileName = `${cacheFilePath}`;
  if (_savedContents !== undefined) {
    existSavedContens = true;
  }

  if (fetchedContents && fetchedContents.value && fetchedContents.value.length > 0) {
    existFetchedContens = true;
  }

  const savedContents = _savedContents as ContentsType;
  const category = _category !== '' ? _category : 'Top';

  if (existFetchedContens && existSavedContens) {
    const savedLastUnixtime = new Date(savedContents.value[0].datePublished).getTime();
    returnContents = savedContents.value ? savedContents : (({ value: [] } as unknown) as ContentsType);
    fetchedContents.value.sort(sortContents);

    const addFetchContentsIndex = fetchedContents.value.findIndex((value: Value) => {
      const fetchedUnixtime = new Date(value.datePublished).getTime();
      return fetchedUnixtime < savedLastUnixtime;
    });
    const addFetchContents = fetchedContents.value.slice(0, addFetchContentsIndex - 1);
    returnContents.value = addFetchContents.concat(returnContents.value);
    returnContents.value = returnContents.value.slice(0, keepContentsCnt);

    const lastPublishedUnixtime = new Date(returnContents.value[0].datePublished).getTime();
    console.log(`UPDATE JSON fetchLast: ${lastPublishedUnixtime} saved: ${savedLastUnixtime}`);

    saveFileName = `${cacheFilePath}${lastPublishedUnixtime}.json`;
    fs.writeFileSync(saveFileName, JSON.stringify(returnContents));
    fs.unlinkSync(cacheFileFullname);
  } else if (existFetchedContens && !existSavedContens) {
    console.log('FETCH CREATE JSON');
    saveFileName = `${cacheFilePath}${nowUnixtime}.json`;
    fetchedContents.value.sort(sortContents);
    returnContents = fetchedContents;
    returnContents.value = returnContents.value.slice(0, keepContentsCnt);
    setupFloders(mediaType, mktType, category);
    fs.writeFileSync(saveFileName, JSON.stringify(returnContents));
  } else if (!existFetchedContens && existSavedContens) {
    console.log('NO FETCH');
    returnContents = savedContents;
  } else {
    console.log('NO FETCH NO SAVE FILE');
    saveFileName = `${cacheFilePath}${nowUnixtime}.json`;
    returnContents = fetchedContents;
    setupFloders(mediaType, mktType, category);
    fs.writeFileSync(saveFileName, JSON.stringify(returnContents));
  }
  return returnContents;
};

const sortContents = (a: Value, b: Value) => {
  if (a.datePublished < b.datePublished) return 1;
  if (a.datePublished > b.datePublished) return -1;
  return 0;
};

const setupFloders = (mediaType: string, mktType: string, category: string) => {
  setupFolder('src/json');
  setupFolder(`src/json/${mediaType}`);
  setupFolder(`src/json/${mediaType}/${mktType}`);
  setupFolder(`src/json/${mediaType}/${mktType}/${category}`);
};

const setupFolder = (path: string) => {
  const exist = fs.existsSync(path);
  if (!exist) fs.mkdirSync(path);
};

const getCacheFilePath = (mediaType: string, mktType: string, _category: string) => {
  const category = _category === '' ? 'Top' : _category;
  return `src/json/${mediaType}/${mktType}/${category}/`;
};
*/
