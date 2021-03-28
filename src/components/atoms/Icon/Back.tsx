import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  focusAnimation?: boolean;
};

const BackIcon: FunctionComponent<Props> = (props: Props) => (
  <Container>
    <Symbol focusAnimation={props.focusAnimation || true} />
  </Container>
);

export default BackIcon;

const size = StylesVars.iconBaseSize;
const Container = styled.div`
  display: block;
  width: ${size}px;
  min-width: ${size}px;
  max-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;
`;

type SymbolPropsType = {
  focusAnimation: boolean;
};

const Symbol = styled.div<SymbolPropsType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${size}px;
  height: ${size}px;
  cursor: pointer;
  border-radius: ${Number(size) / 2}px;
  box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: ${(props) => (props.focusAnimation ? '0 0 10px rgba(230, 230, 230, 1) inset' : 'none')};
  }
  &::before {
    position: relative;
    top: -4px;
    left: 5px;
    width: 14px;
    height: 4px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 4px;
    transform: rotate(-45deg);
  }
  &::after {
    position: relative;
    top: 4.5px;
    left: -8.5px;
    width: 14px;
    height: 4px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 4px;
    transform: rotate(45deg);
  }
`;
