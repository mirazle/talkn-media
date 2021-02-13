import sitemapJson from 'json/news/sitemap.json';
import { Category, NewsSitemap } from 'schema/NewsSitemap';

export const defaultMktType = String(process.env['DEFAULT_MKT_TYPE']);
export const defaultCategory = String(process.env['DEFAULT_CATEGORY']);

export const validUrlParams = (mktType = defaultMktType, category = defaultCategory): boolean => {
  const categories: Category[] | [] = getCategories(mktType);
  if (categories.length > 0) {
    return category === defaultCategory ? false : !categories.find((c) => c.category === category);
  } else {
    return true;
  }
};

type GetUrlParamsType = {
  mktType: string;
  category: string;
};

export const getCorrectUrlParams = (_mktType: string, _category: string): GetUrlParamsType => {
  let mktType, category;
  if (validUrlParams(_mktType, _category)) {
    mktType = defaultMktType;
    category = defaultCategory;
  } else {
    mktType = _mktType;
    category = _category;
  }
  return { mktType, category };
};

export const getCategories = (mktType: string, complementDefault = false): Category[] | [] => {
  const sitemap = sitemapJson.find((sitemap: NewsSitemap) => sitemap.Market === mktType);
  if (sitemap) {
    return sitemap.Categories;
  } else {
    if (complementDefault) {
      return sitemapJson[0]['Categories'];
    } else {
      return [];
    }
  }
};
