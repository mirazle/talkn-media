import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { LoadingState } from 'state';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import GridOrder from 'components/organisms/GridOrder';
import TalknData from 'components/organisms/Menu/TalknData';
import StylesVars from 'styles/StylesVars';
import {
  MediaCategoryType,
  MediaTypeNews,
  MediaTypeSubdomains,
  NetworkCategoryList,
  NetworkList,
  producthost,
} from 'utils/Networks';

type Props = {
  isMaxLayout: boolean;
  isOpenMenu: boolean;
};

const MenuSection: FunctionComponent<Props> = (props) => {
  const [isLoading] = useRecoilState(LoadingState);
  const { isMaxLayout, isOpenMenu } = props;
  const LiveMediaList = Object.keys(NetworkCategoryList).map((_mediaCategory: string) => {
    const mediaCategory = _mediaCategory as MediaCategoryType;
    const mediaTypes = NetworkCategoryList[mediaCategory];
    const list = Array.from(mediaTypes).map((_mediaType: string) => {
      const mediaType = _mediaType as MediaTypeSubdomains;
      const label = NetworkList[mediaType].label;
      const subDomain = NetworkList[mediaType].subDomain;
      const active = mediaType === MediaTypeNews;
      return <BoxList label={label} key={label} active={active} href={`https://${subDomain}.${producthost}`} />;
    });
    return (
      <GridOrder key={mediaCategory} className='GridOrder'>
        {list}
      </GridOrder>
    );
  });
  return (
    <Container isLoading={isLoading} isOpenMenu={isOpenMenu} isMaxLayout={isMaxLayout}>
      <TalknData />
      {LiveMediaList}
    </Container>
  );
};

export default MenuSection;

type ContainerType = {
  isLoading: boolean;
  isOpenMenu: boolean;
  isMaxLayout: boolean;
};
const padding = 10;
const Container = styled.section<ContainerType>`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-flow: column nowrap;
  height: calc(100vh - ${StylesVars.baseHeight}px);
  padding: ${padding}px ${padding}px ${Number(StylesVars.baseHeight) * 2}px;
  overflow-x: scroll;
  background: rgba(221, 221, 221, 0.94);
  border-radius: 0 0 2px 2px;
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? `calc( 50vw - ${Number(StylesVars.maxWidth) / 2}px) ` : '0px')},
    ${(props) => (props.isOpenMenu ? `${StylesVars.baseHeight}px` : '-100%')}
  );
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: ${StylesVars.menuSpWidth}px;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: ${StylesVars.menuPcWidth}px;
  }
  .GridOrder {
    margin-top: 10px;
  }
`;
