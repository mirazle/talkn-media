import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import BackIcon from 'components/atoms/Icon/Back';
import StylesVars from 'styles/StylesVars';
import { talknLiveMediaHost } from 'utils/Networks';

const Menu: FunctionComponent = () => {
  return (
    <Container href={`https://${talknLiveMediaHost}`}>
      <BackIcon focusAnimation={false} />
      <AppName>talkn</AppName>
    </Container>
  );
};

export default Menu;

const Container = styled.a`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  height: ${StylesVars.baseHeight}px;
  min-height: ${StylesVars.baseHeight}px;
  padding-left: 10px;
  cursor: pointer;
  background: #fff;
  &:hover {
    background: rgba(245, 245, 245, 1);
  }
`;

const AppName = styled.div`
  flex: 1;
  text-align: center;
  text-indent: -${StylesVars.baseHeight}px;
`;
