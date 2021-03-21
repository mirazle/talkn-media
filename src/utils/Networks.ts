import mediaTypes from 'json/mediaTypes.json';
console.log(mediaTypes);
const env = process.env['ENVIROMENT'];
export const localhost = 'localhost';
export const producthost = 'talkn.io';
export const talknScriptHost = env === 'development' ? localhost : producthost;

// talkn live media (subdomain).
export const MediaTypeNews = 'news';
export const MediaTypeGirlsNews = 'girls-news';
export const MediaTypeTrend = 'trend-word';
export const MediaTypeApps = 'app';
export const MediaTypeMusic = 'music';
export const MediaTypeVideo = 'video';
export const MediaTypeBook = 'book';

export type MediaTypeKeys =
  | typeof MediaTypeNews
  | typeof MediaTypeGirlsNews
  | typeof MediaTypeTrend
  | typeof MediaTypeApps
  | typeof MediaTypeMusic
  | typeof MediaTypeVideo
  | typeof MediaTypeBook;

export type NetworkType = {
  label: string;
  method: 'GET' | 'POST';
  endpoint: string;
  headers: HeadersInit;
  count: number;
};

/*
  where	検索で使用される市場 (場所と言語) を選択するドロップダウン メニュー。
  query	検索語句を入力するテキスト フィールド。
  category	特定の種類の結果のレベルを上げる際に使用するチェック ボックス。 たとえば、健康ニュースのランクを上げると、健康の順位が上がります。
    MaxClass, World, Japan, Business, Entertainment, Sports, ScienceAndTechnology, Politics, LifeStyle
  when	オプションとして、最近の日、週、または月に検索を限定するためのドロップダウン メニュー。
  safe	"成人向け" の結果をフィルターで除外する Bing のセーフサーチ機能を使用するかどうかを指定するチェック ボックス。
  count	隠しフィールド。 各要求に対して返される検索結果の数。 変更すると、1 ページあたりの結果の表示数が増減します。
  offset	隠しフィールド。 要求における最初の検索結果のオフセット。ページングに使用されます。 新しい要求では 0 にリセットされます。

  https://docs.microsoft.com/en-us/rest/api/cognitiveservices-bingsearch/bing-news-api-v7-reference#news-categories-by-market
*/
const NetworkNews: NetworkType = {
  label: 'News',
  method: 'GET',
  endpoint: `https://${String(mediaTypes.news.endpointHost)}/?`,
  headers: {
    'x-rapidapi-host': String(mediaTypes.news.endpointHost),
    'x-rapidapi-key': mediaTypes.news.endpointKey,
  },
  count: 50,
};

const NetworkGirlsNews: NetworkType = {
  label: 'Girls News',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkTrend: NetworkType = {
  label: 'Trend Word Ranking',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkApps: NetworkType = {
  label: 'App Ranking',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkMusic: NetworkType = {
  label: 'Music Ranking',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkVideo: NetworkType = {
  label: 'Video Ranking',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkBook: NetworkType = {
  label: 'Book Ranking',
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

export const NetworkList = {
  [MediaTypeNews]: NetworkNews,
  [MediaTypeGirlsNews]: NetworkGirlsNews,
  [MediaTypeTrend]: NetworkTrend,
  [MediaTypeApps]: NetworkApps,
  [MediaTypeMusic]: NetworkMusic,
  [MediaTypeVideo]: NetworkVideo,
  [MediaTypeBook]: NetworkBook,
};

export const getNetwork = (mediaType: MediaTypeKeys): NetworkType => {
  return NetworkList[mediaType];
};
