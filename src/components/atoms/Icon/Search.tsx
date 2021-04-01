import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  close?: boolean;
  focusAnimation?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

type FinnishProps = {
  close: boolean;
  focusAnimation: boolean;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const defaultFocusAnimation = true;
const getFinnishProps = (props: Props): FinnishProps => {
  const close = props.close !== undefined ? props.close : false;
  const focusAnimation = props.focusAnimation !== undefined ? props.focusAnimation : defaultFocusAnimation;
  const onClick = props.onClick ? props.onClick : () => {};
  return { close, onClick, focusAnimation };
};

const SearchlIcon: FunctionComponent<Props> = (_props: Props) => {
  const props: FinnishProps = getFinnishProps(_props);
  return (
    <Container {...props}>
      <Symbol close={props.close} />
    </Container>
  );
};

export default SearchlIcon;

type ContainerPropsType = {
  focusAnimation?: boolean;
};

const size = Number(StylesVars.iconBaseSize);
const rupeSize = 26;
const Container = styled.a<ContainerPropsType>`
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
    box-shadow: ${(props) => (props.focusAnimation ? '0 0 10px rgba(230, 230, 230, 1) inset' : 'none')};
  }
`;

const SearchCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    position: absolute;
    width: 4px;
    height: 12px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 6px;
    transition: ${StylesVars.transitionDuration};
    transform: rotate(45deg) translate(0, 14px);
  }
  &::after {
    position: relative;
    width: ${rupeSize}px;
    min-width: ${rupeSize}px;
    max-width: ${rupeSize}px;
    height: ${rupeSize}px;
    min-height: ${rupeSize}px;
    max-height: ${rupeSize}px;
    margin: 0 0 5px 5px;
    cursor: pointer;
    content: '';
    border: 4px solid ${StylesVars.markupColor};
    border-radius: 15px;
    transition: ${StylesVars.transitionDuration};
  }
`;

const CloseCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    position: absolute;
    width: 4px;
    min-width: 4px;
    max-width: 4px;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 3px;
    transition: ${StylesVars.transitionDuration};
    transform: rotate(45deg);
  }
  &::after {
    position: relative;
    width: 4px;
    min-width: 4px;
    max-width: 4px;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    content: '';
    border: 2px solid ${StylesVars.markupColor};
    border-radius: 3px;
    transition: ${StylesVars.transitionDuration};
    transform: rotate(-45deg);
  }
`;

type SymbolPropsType = {
  close: boolean;
};

const Symbol = styled.div<SymbolPropsType>`
  ${(props) => (props.close ? CloseCss : SearchCss)};
`;
