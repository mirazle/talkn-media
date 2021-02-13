import { atom } from 'recoil';

const defaultMediaType = String(process.env['DEFAULT_MEDIA_TYPE']);
const defaultMktType = String(process.env['DEFAULT_MKT_TYPE']);

export const LoadingState = atom({
  key: 'LoadingState',
  default: false,
});

export const MediaTypeState = atom({
  key: 'mediaTypeState',
  default: defaultMediaType,
});

export const MktTypeState = atom({
  key: 'mktTypeState',
  default: defaultMktType,
});

export const CategoryState = atom({
  key: 'categoryState',
  default: '',
});

export const UrlState = atom({
  key: 'urlState',
  default: '',
});
