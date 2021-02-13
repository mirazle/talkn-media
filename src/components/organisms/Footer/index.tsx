import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import OtherContents from 'components/organisms/Footer/OtherContents';
import Sitemap from 'components/organisms/Footer/Sitemap';

type Props = {
  mktType: string;
  category: string;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const Footer: FunctionComponent<Props> = (props: Props) => {
  const { mktType, category, redirectTo } = props;
  return (
    <Container>
      <Sitemap mktType={mktType} category={category} redirectTo={redirectTo} />
      <OtherContents />
      <Design>
        <Bar />
        <BarArrow />
        <Logo />
        <div>- 全てのコンテンツはコミニュケーションを含む -</div>
        <Copyright>Copyright © talkn, Inc.</Copyright>
      </Design>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  position: relative;
  z-index: 91;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  color: #fff;
  background: #333;
`;

const Design = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 1200px;
  background: #111 url(https://assets.talkn.io/img/walk.png) 80% 80% / 200px 40px no-repeat;
`;

const Bar = styled.div`
  width: 40px;
  height: 60%;
  margin-left: 30%;
  background: rgb(35, 35, 35);
`;

const BarArrow = styled.div`
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
  border-color: transparent transparent rgb(35, 35, 35) transparent;
  border-style: solid;
  border-width: 150px 150px 150px 0;
  transform: translate3d(190px, -203px, 0) rotate(315deg);
`;

const Logo = styled.div`
  position: absolute;
  width: 512px;
  height: 512px;
  background: url(https://assets.talkn.io/img/logo3.png) 100% / 512px no-repeat;
  opacity: 0.2;
  transform: translate3d(140px, 640px, 0);
`;

const Copyright = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 100px;
`;
