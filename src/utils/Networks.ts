import mediaTypes from 'json/mediaTypes.json';

const development = 'development';
const production = 'production';
const env = process.env['ENVIROMENT'];
export const localhost = 'localhost';
export const producthost = 'talkn.io';
export const talknLiveMediaHost = env === development ? localhost : producthost;

// talkn live media categories.
export const MediaTypeCategoryBase = 'Base Media';
export const MediaTypeCategoryRanking = 'Rank Media';
export const MediaTypeCategoryBuzzCycle = 'Buzz Media';

// default media type category.
export const defaultMediaTypeCategory: MediaCategoryType = MediaTypeCategoryBuzzCycle;

// talkn live media (subdomain).
export const MediaTypeArtists = 'artists';
export const MediaTypeContents = 'contents';
export const MediaTypeMusic = 'music';
export const MediaTypeMovies = 'movies';
export const MediaTypeApps = 'apps';
export const MediaTypeBooks = 'books';
export const MediaTypeNews = 'news';
export const MediaTypeGirlsNews = 'girls-news';
export const MediaTypeTrendWord = 'trend-word';

export type MediaCategoryType =
  | typeof MediaTypeCategoryBase
  | typeof MediaTypeCategoryRanking
  | typeof MediaTypeCategoryBuzzCycle;

export type MediaCategoryBaseBelong = typeof MediaTypeArtists | typeof MediaTypeContents;

export type MediaCategoryRankingBelong =
  | typeof MediaTypeMusic
  | typeof MediaTypeMovies
  | typeof MediaTypeApps
  | typeof MediaTypeBooks;

export type MediaCategoryBuzzCycleBelong = typeof MediaTypeNews | typeof MediaTypeGirlsNews | typeof MediaTypeTrendWord;

export const NetworkCategoryListBaseBelongType: MediaCategoryBaseBelong[] = [MediaTypeArtists, MediaTypeContents];
export const NetworkCategoryListRankingBelongType: MediaCategoryRankingBelong[] = [
  MediaTypeMusic,
  MediaTypeMovies,
  MediaTypeApps,
  MediaTypeBooks,
];
export const NetworkCategoryListBuzzCycleBelongType: MediaCategoryBuzzCycleBelong[] = [
  MediaTypeNews,
  MediaTypeGirlsNews,
  MediaTypeTrendWord,
];

export type NetworkCateogryListBelongType =
  | MediaCategoryBaseBelong[]
  | MediaCategoryRankingBelong[]
  | MediaCategoryBuzzCycleBelong[];

type NetworkCategoryListType = Record<MediaCategoryType, NetworkCateogryListBelongType>;

export const NetworkCategoryList: NetworkCategoryListType = {
  [MediaTypeCategoryBase]: NetworkCategoryListBaseBelongType,
  [MediaTypeCategoryRanking]: NetworkCategoryListRankingBelongType,
  [MediaTypeCategoryBuzzCycle]: NetworkCategoryListBuzzCycleBelongType,
};

export type MediaTypeSubdomains =
  | typeof MediaTypeArtists
  | typeof MediaTypeContents
  | typeof MediaTypeMusic
  | typeof MediaTypeMovies
  | typeof MediaTypeApps
  | typeof MediaTypeBooks
  | typeof MediaTypeNews
  | typeof MediaTypeGirlsNews
  | typeof MediaTypeTrendWord;

// default media type.
export const defaultMediaType: MediaTypeSubdomains = MediaTypeNews;

export type NetworkType = {
  subDomain: MediaTypeSubdomains;
  label: string;
  method: 'GET' | 'POST';
  endpoint: string;
  headers: HeadersInit;
  devPort: number;
  count: number;
  getImageParams: string;
};

type NetworkListType = Record<MediaTypeSubdomains, NetworkType>;

/*
  https://rss.itunes.apple.com/ja-jp
*/
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

const NetworkArtists: NetworkType = {
  subDomain: 'artists',
  label: 'Artists',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 4001,
  getImageParams: '',
  count: 50,
};

const NetworkContents: NetworkType = {
  subDomain: 'contents',
  label: 'Contents',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 4002,
  getImageParams: '',
  count: 50,
};

const NetworkMusic: NetworkType = {
  subDomain: 'music',
  label: 'Music Rank',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 5001,
  getImageParams: '',
  count: 50,
};

const NetworkMovies: NetworkType = {
  subDomain: 'movies',
  label: 'Movies Rank',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 5002,
  getImageParams: '',
  count: 50,
};

const NetworkApps: NetworkType = {
  subDomain: 'apps',
  label: 'Apps Rank',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 5003,
  getImageParams: '',
  count: 50,
};

const NetworkBooks: NetworkType = {
  subDomain: 'books',
  label: 'Books Rank',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 5004,
  getImageParams: '',
  count: 50,
};

const NetworkNews: NetworkType = {
  subDomain: 'news',
  label: 'News',
  method: 'GET',
  endpoint: `https://${String(mediaTypes.news.endpointHost)}`,
  headers: {
    'x-rapidapi-host': String(mediaTypes.news.endpointHost),
    'x-rapidapi-key': mediaTypes.news.endpointKey,
    'useQueryString': 'true',
  },
  devPort: 6001,
  getImageParams: '&w=300&dpr=2&qlt=190',
  count: 50,
};

const NetworkGirlsNews: NetworkType = {
  subDomain: 'girls-news',
  label: 'Girls News',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 6002,
  getImageParams: '',
  count: 50,
};

const NetworkTrendWord: NetworkType = {
  subDomain: 'trend-word',
  label: 'Trend Word',
  method: 'GET',
  endpoint: '',
  headers: {},
  devPort: 6003,
  getImageParams: '',
  count: 50,
};

export const NetworkList: NetworkListType = {
  [MediaTypeArtists]: NetworkArtists,
  [MediaTypeContents]: NetworkContents,
  [MediaTypeMusic]: NetworkMusic,
  [MediaTypeMovies]: NetworkMovies,
  [MediaTypeApps]: NetworkApps,
  [MediaTypeBooks]: NetworkBooks,
  [MediaTypeNews]: NetworkNews,
  [MediaTypeGirlsNews]: NetworkGirlsNews,
  [MediaTypeTrendWord]: NetworkTrendWord,
};

export const getNetwork = (mediaType: MediaTypeSubdomains): NetworkType => {
  return NetworkList[mediaType] ? NetworkList[mediaType] : NetworkList[defaultMediaType];
};

export const getMediaType = (host: string): MediaTypeSubdomains => {
  const findCallbak =
    env === production
      ? (mediaType: string) => host.indexOf(`${NetworkList[mediaType as MediaTypeSubdomains].subDomain}.${producthost}`) >= 0
      : (mediaType: string) => host.indexOf(`${localhost}:${NetworkList[mediaType as MediaTypeSubdomains].devPort}`) >= 0;
  const mediaType = Object.keys(NetworkList).find(findCallbak) as MediaTypeSubdomains;
  return NetworkList[mediaType] ? mediaType : defaultMediaType;
};

export const getMyHost = (mediaType: MediaTypeSubdomains): string => {
  return env === production ? `https://${mediaType}.${producthost}` : `http://${localhost}:${getNetwork(mediaType).devPort}`;
};
