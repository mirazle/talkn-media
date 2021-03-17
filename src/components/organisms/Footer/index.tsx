import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { CategoryState, MktTypeState } from 'state';
import styled from 'styled-components';

import DesignSection from 'components/organisms/Footer/DesignSection';
import MessageSection from 'components/organisms/Footer/MessageSection';
import OtherContentsSection from 'components/organisms/Footer/OtherContentsSection';
import SitemapSection from 'components/organisms/Footer/SitemapSection';
import StylesVars from 'styles/StylesVars';

type Props = {
  isSpLayout: boolean;
  isDispFooter: boolean;
  windowInnerHeight: number;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const Footer: FunctionComponent<Props> = (props: Props) => {
  const [mktType] = useRecoilState(MktTypeState);
  const [category] = useRecoilState(CategoryState);
  const { isSpLayout, isDispFooter, windowInnerHeight, redirectTo } = props;
  return (
    <Container isSpLayout={isSpLayout} isDispFooter={isDispFooter} windowInnerHeight={windowInnerHeight}>
      <SitemapSection mktType={mktType} category={category} redirectTo={redirectTo} />
      <OtherContentsSection />
      <DesignSection />
      <MessageSection />
    </Container>
  );
};

export default Footer;

type ContainerProps = {
  isSpLayout: boolean;
  isDispFooter: boolean;
  windowInnerHeight: number;
};

const Container = styled.footer<ContainerProps>`
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  color: #fff;
  background: #333;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    position: fixed;
    top: 0;
    height: ${(props) => props.windowInnerHeight}px;
    overflow-x: scroll;
    transition: ${StylesVars.transitionDuration};
    transform: translate(0, ${(props) => (props.isDispFooter ? `${StylesVars.baseHeight}px` : '100vh')});
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    position: absolute;
    z-index: 1;
    height: auto;
  }
`;

/*
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    position: relative;
    top: 0;
    overflow-x: hidden;
  }

*/
