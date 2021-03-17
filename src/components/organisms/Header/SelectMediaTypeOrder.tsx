import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import StylesVars from 'styles/StylesVars';
import { MediaTypeKeys, MediaTypeNews, NetworkList } from 'utils/Networks';

type Props = {
  isMaxLayout: boolean;
  openSelectMediaTypeOrder: boolean;
};

const SelectMediaTypeOrder: FunctionComponent<Props> = (props) => {
  const { isMaxLayout, openSelectMediaTypeOrder } = props;
  const LiveMediaList = Array.from(Object.keys(NetworkList)).map((_mediaType: string) => {
    const mediaType = _mediaType as MediaTypeKeys;
    const label = NetworkList[mediaType].label;
    const active = mediaType === MediaTypeNews;
    const onClick = () => (location.href = 'https://news.talkn.io');
    return <BoxList label={label} key={label} active={active} onClick={onClick} />;
  });
  return (
    <Container openSelectMediaTypeOrder={openSelectMediaTypeOrder} isMaxLayout={isMaxLayout}>
      {LiveMediaList}
    </Container>
  );
};

export default SelectMediaTypeOrder;

type ContainerType = {
  openSelectMediaTypeOrder: boolean;
  isMaxLayout: boolean;
};

const Container = styled.ol<ContainerType>`
  position: fixed;
  top: ${StylesVars.baseHeight}px;
  right: ${(props) => (props.isMaxLayout ? 'unset' : 0)};
  z-index: 0;
  display: grid;
  grid-template-rows: 60px 60px;
  gap: 1px;
  padding: 10px;
  overflow: hidden;
  background: rgba(230, 230, 230, 0.94);
  border-radius: 0 0 2px 2px;
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? 375 : 0)}px,
    ${(props) => (props.openSelectMediaTypeOrder ? 0 : -100)}%
  );
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 200px;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 320px;
  }
`;
