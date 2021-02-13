const env = process.env['ENVIROMENT'];

export const localhost = 'localhost';
export const producthost = 'talkn.io';
export const talknScriptHost = env === 'development' ? localhost : producthost;

// talkn live media.
export const MediaTypeNews = 'news';
export const MediaTypeTrend = 'trend';
export const MediaTypeGirlsNews = 'girlsNews';

export type MediaTypes = typeof MediaTypeNews | typeof MediaTypeTrend | typeof MediaTypeGirlsNews;
export type NetworkType = {
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
  method: 'GET',
  endpoint: 'https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/?',
  headers: {
    'x-rapidapi-host': 'microsoft-azure-bing-news-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '2ca25813c0msh9db483c3530c143p1009bdjsnde50b6575cf1',
  },
  count: 50,
};

const NetworkTrend: NetworkType = {
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const NetworkGirlsNews: NetworkType = {
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50,
};

const Networks = {
  [MediaTypeNews]: NetworkNews,
  [MediaTypeTrend]: NetworkTrend,
  [MediaTypeGirlsNews]: NetworkGirlsNews,
};

export const getNetwork = (mediaType: MediaTypes): NetworkType => {
  return Networks[mediaType];
};
