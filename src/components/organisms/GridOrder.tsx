import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  className?: string;
  children: React.ReactChild[];
};

type FinnishProps = {
  className?: string;
};

const getFinnishProps = (props: Props): FinnishProps => {
  const className = props.className && props.className;
  return { className };
};

const SelectMediaOrder: FunctionComponent<Props> = (props: Props) => (
  <Container {...getFinnishProps(props)}>{props.children}</Container>
);

export default SelectMediaOrder;

const Container = styled.ol`
  display: grid;
  grid-auto-rows: ${StylesVars.baseHeight}px;
  gap: 1px;
  width: 100%;
  margin-top: 1px;
  background: rgba(230, 230, 230, 0.94);
  border-radius: 0 0 2px 2px;
`;
