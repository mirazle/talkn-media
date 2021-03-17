import {
  News,
  Value as NewsValue,
  ValueImage as NewsValueImage,
  PurpleThumbnail as NewsPurpleThumbnail,
  About as NewsAbout,
  Mention as NewsMention,
  Provider as NewsProvider,
  Type as NewsProvidersType,
  ProviderImage as NewsProvidersImage,
  FluffyThumbnail as NewsFluffyThumbnail,
  Category as NewsCategory,
  Video as NewsVideo,
} from 'schema/News';
import {
  Trend,
  Value as TrendValue,
  ValueImage as TrendValueImage,
  PurpleThumbnail as TrendPurpleThumbnail,
  About as TrendAbout,
  Mention as TrendMention,
  Provider as TrendProvider,
  Type as TrendProvidersType,
  ProviderImage as TrendProvidersImage,
  FluffyThumbnail as TrendFluffyThumbnail,
  Category as TrendCategory,
  Video as TrendVideo,
} from 'schema/Trend';
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
export type ImageThumbnailType = NewsPurpleThumbnail | TrendPurpleThumbnail;

// about
export type AboutType = NewsAbout | TrendAbout;

// mention
export type MentionType = NewsMention | TrendMention;

// provider
export type ProviderType = NewsProvider | TrendProvider;

const ProvidersType = { ...NewsProvidersType, ...TrendProvidersType };
export type ProvidersType = NewsProvidersType | TrendProvidersType;
export type ProviderImageType = NewsProvidersImage | TrendProvidersImage;
export type FluffyThumbnailType = NewsFluffyThumbnail | TrendFluffyThumbnail;

// category
export type CategoryType = NewsCategory | TrendCategory;

// video
export type VideoType = NewsVideo | TrendVideo;

// sitemap
export type ContentsSiteMapType = NewsSitemap;
