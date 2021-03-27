import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  onClick: () => void;
};

const SearchlIcon: FunctionComponent<Props> = (props: Props) => {
  return (
    <Container onClick={props.onClick}>
      <Symbol />
    </Container>
  );
};

export default SearchlIcon;

const size = Number(StylesVars.iconSize);
const rupeSize = 26;
const Container = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  min-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
  border-radius: ${size / 2}px;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
  }
`;

const Symbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rupeSize}px;
  min-width: ${rupeSize}px;
  max-width: ${rupeSize}px;
  height: ${rupeSize}px;
  min-height: ${rupeSize}px;
  max-height: ${rupeSize}px;
  margin: 0 0 5px 5px;
  cursor: pointer;
  border: 4px solid ${StylesVars.markupColor};
  border-radius: 16px;
  &::before {
    position: relative;
    top: 13px;
    left: -12px;
    width: 4px;
    height: 12px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 6px;
    transform: rotate(45deg);
  }
`;
