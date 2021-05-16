import type { FunctionComponent } from 'react';
import styled from 'styled-components';

type Props = {
  className: string;
};

const LiveCnt: FunctionComponent<Props> = (props: Props) => {
  return <Container id='LiveCntWrap' className={props.className} />;
};

export default LiveCnt;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  max-width: 30px;
  height: 30px;
  max-height: 30px;
  transform: translate(0, -10px);
`;
