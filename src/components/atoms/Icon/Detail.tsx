import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
};

type FinnishProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
};

const getFinnishProps = (props: Props): FinnishProps => {
  const className = props.className && props.className;
  const onClick = props.onClick ? props.onClick : () => {};
  return { onClick, className };
};

const DetailIcon: FunctionComponent<Props> = (_props: Props) => {
  const props: FinnishProps = getFinnishProps(_props);
  return (
    <Container id='talknOpenDetail' {...props}>
      <Dogyear />
      <Symbol>
        <LineShort />
        <Line />
        <Line />
        <Line />
      </Symbol>
    </Container>
  );
};

export default DetailIcon;

const size = StylesVars.iconBaseSize;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  min-width: ${size}px;
  max-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  border-radius: ${Number(size) / 2}px;
  box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
  }
`;

const Symbol = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-end;
  width: 58%;
  min-width: 58%;
  max-width: 58%;
  height: 64%;
  min-height: 64%;
  max-height: 64%;
  padding: 5% 5% 8% 5%;
  overflow: hidden;
  background: rgb(221, 221, 221);
  border-radius: 3px 50% 3px 3px;
`;

const LineShort = styled.div`
  width: 30%;
  height: 2px;
  min-height: 2px;
  max-height: 2px;
  margin: 9% 12%;
  background: #fff;
  border-radius: 1px;
`;

const Line = styled.div`
  width: 71%;
  height: 2px;
  min-height: 2px;
  max-height: 2px;
  margin: 8% 12%;
  background: #fff;
  border-radius: 1px;
`;

const Dogyear = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-color: rgb(255, 255, 255) rgb(180, 180, 180) rgb(180, 180, 180) rgb(255, 255, 255);
  border-style: solid;
  border-width: 6px;
  transform: translate3d(8.5px, -10px, 0) rotate(90deg);
`;
