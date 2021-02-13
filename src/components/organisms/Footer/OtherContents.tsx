import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';

type Props = unknown;

const OtherContents: FunctionComponent<Props> = () => {
  return (
    <Container>
      <h3>- Other Contents -</h3>
      <ul>
        <li className='title'>Talkn For</li>
        <BoxList label='User' theme='dark' />
        <BoxList label='Website owner' theme='dark' />
        <BoxList label='Developper(Api)' theme='dark' />
        <BoxList label='Chrome extension' theme='dark' />
      </ul>
      <ul>
        <li className='title'>Live Media</li>
        <BoxList label='News' theme='dark' active />
        <BoxList label='Girls News' theme='dark' />
        <BoxList label='Trend' theme='dark' />
        <BoxList label='App' theme='dark' />
        <BoxList label='Music' theme='dark' />
        <BoxList label='Video' theme='dark' />
        <BoxList label='Book' theme='dark' />
      </ul>
      <ul>
        <li className='title'>Include your site</li>
        <BoxList label='API' theme='dark' />
        <BoxList label='CLIENT' theme='dark' />
      </ul>
      <ul>
        <li className='title'>Contact</li>
        <BoxList label='Contact1' theme='dark' />
        <BoxList label='Contact2' theme='dark' />
      </ul>
    </Container>
  );
};

export default OtherContents;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  background: rgb(35, 35, 35);
  h3 {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
  ul {
    display: flex;
    flex-flow: column wrap;
    min-width: 180px;
    margin: 10px;
    text-align: center;
  }
  li {
    margin: 10px;
  }
  li.title {
    font-weight: 500;
    cursor: default;
  }
`;
