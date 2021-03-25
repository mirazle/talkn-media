import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import StylesVars from 'styles/StylesVars';
import { MediaTypeNews, MediaTypeSubdomains, NetworkList } from 'utils/Networks';

type Props = unknown;

const OtherContentsSection: FunctionComponent<Props> = () => {
  const LiveMediaList = Array.from(Object.keys(NetworkList)).map((_mediaType: string) => {
    const mediaType = _mediaType as MediaTypeSubdomains;
    const label = NetworkList[mediaType].label;
    const active = mediaType === MediaTypeNews;
    return <BoxList label={label} key={label} active={active} theme='dark' href='https://news.talkn.io' />;
  });

  return (
    <Container>
      <h2>- Other Contents -</h2>
      <ul>
        <li className='title'>Talkn For</li>
        <BoxList label='User' theme='dark' href='https://www.talkn.io' />
        <BoxList label='Website owner' theme='dark' href='https://own.talkn.io' />
        <BoxList label='Developper(Api)' theme='dark' href='https://api.talkn.io' />
        <BoxList
          label='Chrome extension'
          theme='dark'
          href='https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en'
        />
      </ul>
      <ul>
        <li className='title'>Live Media</li>
        {LiveMediaList}
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

export default OtherContentsSection;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  background: rgb(35, 35, 35);
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    padding: 20px 0;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    padding: 20px;
  }
  h2 {
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
    @media (max-width: ${StylesVars.spLayoutWidth}px) {
      min-width: 160px;
    }
    @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
      min-width: 180px;
    }
  }
  li {
    margin: 10px;
  }
  li.title {
    font-weight: 500;
    cursor: default;
  }
`;
