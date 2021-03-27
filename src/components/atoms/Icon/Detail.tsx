import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  onClick: () => void;
};

const DetailIcon: FunctionComponent<Props> = (props: Props) => {
  return (
    <Container onClick={props.onClick}>
      <Symbol />
    </Container>
  );
};

export default DetailIcon;

const size = StylesVars.iconSize;
const Container = styled.a`
  display: block;
  width: ${size}px;
  min-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
`;

const Symbol = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
  }
  &::before {
    position: relative;
    top: -12px;
    width: 8px;
    height: 8px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 6px;
    box-shadow: 0 12px 0 ${StylesVars.markupColor}, 0 24px 0 ${StylesVars.markupColor};
  }
`;
