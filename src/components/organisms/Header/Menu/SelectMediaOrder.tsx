import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import { MediaTypeNews, MediaTypeSubdomains, NetworkList, producthost } from 'utils/Networks';

const SelectMediaOrder: FunctionComponent = () => {
  const LiveMediaList = Array.from(Object.keys(NetworkList)).map((_mediaType: string) => {
    const mediaType = _mediaType as MediaTypeSubdomains;
    const label = NetworkList[mediaType].label;
    const subDomain = NetworkList[mediaType].subDomain;
    const active = mediaType === MediaTypeNews;
    return <BoxList label={label} key={label} active={active} href={`https://${subDomain}.${producthost}`} />;
  });
  return <Container>{LiveMediaList}</Container>;
};

export default SelectMediaOrder;

const Container = styled.ol`
  display: grid;
  grid-template-rows: 60px 60px;
  gap: 1px;
  width: 100%;
  overflow: hidden;
  background: rgba(230, 230, 230, 0.94);
  border-radius: 0 0 2px 2px;
`;
