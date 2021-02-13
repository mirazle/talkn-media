import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { MktTypeState } from 'state';

import BoxNavigation from 'components/organisms/Navigation/BoxNavigation';
import LineNavigation from 'components/organisms/Navigation/LineNavigation';
import { getCategories } from 'utils/Sitemap';

type Props = {
  lineNavScrollWidth: number;
  setLineNavScrollWidth: React.Dispatch<React.SetStateAction<number>>;
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const Navigation: FunctionComponent<Props> = (props: Props) => {
  const [mktType] = useRecoilState(MktTypeState);
  const categories = getCategories(mktType);
  return props.isFixedSmallNav ? (
    <LineNavigation {...props} categories={categories} />
  ) : (
    <BoxNavigation {...props} categories={categories} />
  );
};

export default Navigation;
