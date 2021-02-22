import { News, Value as NewsValue, ValueImage as NewsValueImage } from 'schema/News';
import { Trend, Value as TrendValue, ValueImage as TrendValueImage } from 'schema/Trend';
import { NewsSitemap } from 'schema/NewsSitemap';

// contents
export type ContentsType = News | Trend;
export type ContentsValueType = NewsValue | TrendValue;
export type ContentsValuesType = ContentsValueType[] | [];
export type ContentsCacheType = {
  generateUnixtime: number;
  contents: ContentsValuesType;
};

// image
export type ImageType = NewsValueImage | TrendValueImage;

// sitemap
export type ContentsSiteMapType = NewsSitemap;
