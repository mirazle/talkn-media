import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = unknown;

const MessageSection: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Message>- 全てのコンテンツはコミニュケーションを含む -</Message>
      <Copyright>Copyright © talkn, Inc.</Copyright>
    </Container>
  );
};

export default MessageSection;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 80px 0;
  color: #fff;
  background: #111;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    padding: 60px 0 120px;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    padding: 80px 0;
  }
`;

const Message = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Copyright = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px;
`;
