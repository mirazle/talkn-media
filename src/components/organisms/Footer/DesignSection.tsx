import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = unknown;

const DesignSection: FunctionComponent<Props> = () => {
  return (
    <Container>
      <BarArrowWrap>
        <Bar />
        <BarArrow />
      </BarArrowWrap>
      <Logo />
    </Container>
  );
};

export default DesignSection;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 1680px;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    background: #111 url(https://assets.talkn.io/img/walk2.png) 50% 100% / 240px no-repeat;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    background: #111 url(https://assets.talkn.io/img/walk2.png) 16% 85% / 240px no-repeat;
  }
`;

const BarArrowWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    height: calc(100% + 190px);
    margin-left: 0;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    height: calc(80% + 190px);
    margin-left: -45%;
  }
`;

const Bar = styled.div`
  width: 40px;
  height: 80%;
  background: rgb(35, 35, 35);
`;

const BarArrow = styled.div`
  width: 150px;
  height: 150px;
  padding: 0;
  margin: 0;
  border-color: transparent transparent rgb(35, 35, 35) transparent;
  border-style: solid;
  border-width: 150px 150px 150px 0;
  transform: translate3d(-104px, -203px, 0) rotate(315deg);
`;

const Logo = styled.div`
  position: absolute;
  width: 512px;
  height: 512px;
  background: url(https://assets.talkn.io/img/logo_glay.png) 100% / 512px no-repeat;
  opacity: 0.2;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    transform: translate3d(-100px, 780px, 0);
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    transform: translate3d(-100px, 640px, 0);
  }
`;
