import { AtomOptions, RecoilState, atom } from 'recoil';
import { ContentsValueType } from 'schema';

import { ContentValueModel } from 'models/ContentValue';
import { defaultMediaType } from 'utils/Networks';

const defaultMktType = String(process.env['DEFAULT_MKT_TYPE']);

export const getRecoilInitAtom = <T>(options: AtomOptions<T>): RecoilState<T> => {
  return atom({
    key: options.key,
    default: options.default,
    dangerouslyAllowMutability: options.dangerouslyAllowMutability,
  });
};

export const LoadingState = getRecoilInitAtom({ key: 'LoadingState', default: false });
export const MediaTypeState = getRecoilInitAtom({ key: 'mediaTypeState', default: defaultMediaType });
export const MktTypeState = getRecoilInitAtom({ key: 'mktTypeState', default: defaultMktType });
export const CategoryState = getRecoilInitAtom({ key: 'categoryState', default: '' });
export const ActiveContentState = getRecoilInitAtom({
  key: 'activeContent',
  default: new ContentValueModel() as ContentsValueType,
});
