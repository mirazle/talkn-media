import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  openSelectContentsOrder: boolean;
};

const SelectContentsOrder: FunctionComponent<Props> = (props) => {
  const { isMaxLayout, openSelectContentsOrder } = props;
  return (
    <Container openSelectContentsOrder={openSelectContentsOrder} isMaxLayout={isMaxLayout}>
      <li className='active'>NEW</li>
      <li>LIVE</li>
    </Container>
  );
};

export default SelectContentsOrder;

type ContainerType = {
  openSelectContentsOrder: boolean;
  isMaxLayout: boolean;
};

const Container = styled.ol<ContainerType>`
  position: fixed;
  top: ${StylesVars.baseHeight}px;
  right: ${(props) => (props.isMaxLayout ? 'unset' : 0)};
  display: grid;
  grid-template-rows: 60px 60px;
  width: 320px;
  height: 140px;
  padding: 10px;
  overflow: hidden;
  background: rgba(230, 230, 230, 0.94);
  border-radius: 0 0 2px 2px;
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? 375 : 0)}px,
    ${(props) => (props.openSelectContentsOrder ? 0 : -140)}px
  );
  li {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 60px;
    cursor: pointer;
    background: rgb(245, 245, 245);
  }
  li.active {
    background: rgb(255, 255, 255);
  }
`;
