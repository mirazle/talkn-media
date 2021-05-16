import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  className?: string;
};

type FinnishProps = {
  className?: string;
};

const getFinnishProps = (props: Props): FinnishProps => {
  const className = props.className && props.className;
  return { className };
};

const CrownIcon: FunctionComponent<Props> = (_props: Props) => {
  const props: FinnishProps = getFinnishProps(_props);
  return (
    <Container {...props}>
      <Inner1 />
      <Inner2 />
    </Container>
  );
};

export default CrownIcon;

const size = StylesVars.iconBaseSize;
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  min-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
`;

const Inner1 = styled.div`
  position: relative;
  top: -10px;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-bottom: 20px solid rgb(79, 174, 159);
`;

const Inner2 = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border: 12px solid rgb(79, 174, 159);
  border-top: 6px solid transparent;
  border-bottom: 12px solid rgb(49, 144, 129);
`;
