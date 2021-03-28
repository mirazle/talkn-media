import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { LoadingState } from 'state';
import styled from 'styled-components';

import SelectMediaOrder from 'components/organisms/Header/Menu/SelectMediaOrder';
import TalknData from 'components/organisms/Header/Menu/TalknData';
import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  isOpenMenu: boolean;
};

const Menu: FunctionComponent<Props> = (props) => {
  const [isLoading] = useRecoilState(LoadingState);
  const { isMaxLayout, isOpenMenu } = props;
  return (
    <Container isLoading={isLoading} isOpenMenu={isOpenMenu} isMaxLayout={isMaxLayout}>
      <TalknData />
      <SelectMediaOrder />
    </Container>
  );
};

export default Menu;

type ContainerType = {
  isLoading: boolean;
  isOpenMenu: boolean;
  isMaxLayout: boolean;
};

const Container = styled.div<ContainerType>`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isMaxLayout ? 'unset' : '0')};
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  overflow: hidden;
  background: rgba(221, 221, 221, 0.94);
  border-radius: 0 0 2px 2px;
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? -375 : 0)}px,
    ${(props) => (props.isOpenMenu ? `${StylesVars.baseHeight}px` : '-100%')}
  );
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: ${StylesVars.menuSpWidth}px;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: ${StylesVars.menuPcWidth}px;
  }
`;
