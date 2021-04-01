import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { LoadingState } from 'state';
import styled from 'styled-components';

import SelectMediaOrder from 'components/organisms/Menu/SelectMediaOrder';
import TalknData from 'components/organisms/Menu/TalknData';
import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  isOpenMenu: boolean;
};

const MenuSection: FunctionComponent<Props> = (props) => {
  const [isLoading] = useRecoilState(LoadingState);
  const { isMaxLayout, isOpenMenu } = props;
  return (
    <Container isLoading={isLoading} isOpenMenu={isOpenMenu} isMaxLayout={isMaxLayout}>
      <TalknData />
      <SelectMediaOrder />
    </Container>
  );
};

export default MenuSection;

type ContainerType = {
  isLoading: boolean;
  isOpenMenu: boolean;
  isMaxLayout: boolean;
};

const Container = styled.section<ContainerType>`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-flow: column wrap;
  padding: 10px;
  overflow: hidden;
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
`;
