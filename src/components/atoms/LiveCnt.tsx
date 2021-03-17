import type { FunctionComponent } from 'react';
import styled from 'styled-components';

const LiveCnt: FunctionComponent = () => {
  return <Container id='LiveCntWrap' />;
};

export default LiveCnt;

const Container = styled.div`
  position: relative;
  top: -10px;
  left: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  max-width: 30px;
  height: 30px;
  max-height: 30px;
`;
