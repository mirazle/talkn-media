//import Memcached from 'memcached';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType } from 'schema';
import { InitComponentProps, ReturnServiceType, UrlParamsType, getServerSidePropsWrap } from 'service';
import { ActiveContentState, CategoryState, MktTypeState } from 'state';
import styled from 'styled-components';

import DeviceSwitchStructure from 'components/organisms/DeviceSwitchStructure';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import { getTalknPostLayout } from 'components/organisms/Main/Thread';
import StylesVars from 'styles/StylesVars';
import { LocalStorageKeys } from 'utils/Constants';
import { getIsSpLayout, updateBaseLayout, urlToCh } from 'utils/Func';
import { talknScriptHost } from 'utils/Networks';

const navigationScrollClassName = 'navigationScroll';

const TalknMedia: FunctionComponent<InitComponentProps> = (props) => {
  const router = useRouter();

  // disp key datas.
  const [mktType, setMktType] = useRecoilState(MktTypeState);
  const [category, setCategory] = useRecoilState(CategoryState);
  const [contents, setContents] = useState(props.contents);
  const [activeContent, setActiveContent] = useRecoilState(ActiveContentState);

  // layout total
  const [isSpLayout, setIsSpLayout] = useState(false);
  const [isMaxLayout, setIsMaxLayout] = useState(false);
  const [isFixedSmallNav, setFixedSmallNav] = useState(false);
  const [openSelectMediaTypeOrder, setOpenSelectMediaTypeOrder] = useState(false);
  const [windowInnerHeight, setWindowInnerHeight] = useState(0);
  const [lineNavScrollWidth, setLineNavScrollWidth] = useState(0);

  // layout talkn post footer TODO: 直す
  const [talknPostWidth, setTalknPostWidth] = useState(0);
  const [talknPostRight, setTalknPostRight] = useState(0);
  const [talknPostFixed, setTalknPostFixed] = useState(true);
  const [isDispFooter, setIsDispFooter] = useState(false);

  const updateActiveContent = (newContent: ContentsValueType, updateIframe = true) => {
    if (newContent && newContent.url !== activeContent.url) {
      setActiveContent(newContent);
      if (updateIframe) {
        const iframeContainer = document.querySelector('#talknLiveMedia') as HTMLDivElement;
        const iframe = document.querySelector('#talknLiveMedia iframe') as HTMLIFrameElement;

        if (iframeContainer && iframe) {
          iframeContainer.dataset.url = newContent.url;
          iframe.src = `https://${talknScriptHost}${urlToCh(newContent.url)}`;
          localStorage.setItem(LocalStorageKeys.url, newContent.url);
        }
      }
    }
  };

  const redirectTo = async (mktType: string, category: string): Promise<boolean> => {
    setOpenSelectMediaTypeOrder(false);
    setIsDispFooter(false);
    return await router.push(`/${mktType}/${category}`);
  };

  const windowEvents = {
    load: React.useCallback(() => {
      const _isSpLayout = getIsSpLayout();
      const _fixedSmallNav = window.scrollY > Number(StylesVars.switchSmallNavScrollY);
      setWindowInnerHeight(window.innerHeight);
      setIsSpLayout(_isSpLayout);
      setFixedSmallNav(_fixedSmallNav || _isSpLayout);
    }, []),
    scroll: React.useCallback(() => {
      const _isSpLayout = getIsSpLayout();
      const _fixedSmallNav = window.scrollY > Number(StylesVars.switchSmallNavScrollY);
      setIsSpLayout(_isSpLayout);
      setFixedSmallNav(_fixedSmallNav || _isSpLayout);
      setTalknPostFixed(window.scrollY + window.innerHeight <= Number(StylesVars.talknPostScrollTop));
      setIsDispFooter(window.scrollY >= Number(StylesVars.footerScrollTop));
    }, []),
    resize: React.useCallback(() => {
      const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);
      const _fixedSmallNav = window.scrollY > Number(StylesVars.switchSmallNavScrollY);
      const _isSpLayout = getIsSpLayout();
      const _isMaxLayout = Number(StylesVars.maxWidth) < window.innerWidth;
      setWindowInnerHeight(window.innerHeight);
      setIsSpLayout(_isSpLayout);
      setFixedSmallNav(_fixedSmallNav || _isSpLayout);
      setIsMaxLayout(_isMaxLayout);
      const { width, right } = getTalknPostLayout(window.innerWidth, _isMaxLayout, _isSpLayout);
      setTalknPostWidth(width);
      setTalknPostRight(right);
      if (navigationScroll) {
        setLineNavScrollWidth(navigationScroll.scrollWidth);
      }

      // base scroll.
      updateBaseLayout(_isSpLayout);
    }, []),
  };

  // did mount
  React.useEffect(() => {
    windowEvents.resize();
    switch (window.document.readyState) {
      case 'interactive':
      case 'complete':
        windowEvents.load();
        break;
      case 'loading':
        window.addEventListener('load', windowEvents.load);
        break;
    }

    window.addEventListener('resize', windowEvents.resize);
    window.addEventListener('scroll', windowEvents.scroll);
    return () => {
      window.removeEventListener('load', windowEvents.load);
      window.removeEventListener('resize', windowEvents.resize);
      window.removeEventListener('scroll', windowEvents.scroll);
    };
  }, []);

  // did update
  React.useEffect(() => {
    const cacheUrl = localStorage.getItem(LocalStorageKeys.url);
    if (props.contents !== contents) setContents(props.contents);
    if (mktType !== props.mktType) setMktType(props.mktType);
    if (category !== props.category) setCategory(props.category);
    if (activeContent.url !== props.url) {
      const findIndex = props.contents.findIndex((content) => content.url === props.url);
      updateActiveContent(props.contents[findIndex]);
    }
    console.log(cacheUrl);
    if (cacheUrl && activeContent.url !== cacheUrl) {
      const _findIndex = props.contents.findIndex((content) => content.url === cacheUrl);
      const findIndex = _findIndex === -1 ? 0 : _findIndex;
      console.log(findIndex);
      console.log(props.contents);
      updateActiveContent(props.contents[findIndex]);
    }
  }, [props.contents, props.mktType, props.category, props.url]);

  // did update url
  React.useEffect(() => {
    localStorage.setItem(LocalStorageKeys.url, activeContent.url);
  }, [activeContent.url]);

  return (
    <Container isSpLayout={isSpLayout} windowInnerHeight={windowInnerHeight}>
      <Header
        isMaxLayout={isMaxLayout}
        isFixedSmallNav={isFixedSmallNav}
        isDispFooter={isDispFooter}
        isSpLayout={isSpLayout}
        openSelectMediaTypeOrder={openSelectMediaTypeOrder}
        setIsDispFooter={setIsDispFooter}
        setOpenSelectMediaTypeOrder={setOpenSelectMediaTypeOrder}
      />
      <Body>
        <AdvertWrap>
          <Advert />
        </AdvertWrap>
        <DeviceSwitchStructure
          isSpLayout={isSpLayout}
          isFixedSmallNav={isFixedSmallNav}
          contents={contents}
          lineNavScrollWidth={lineNavScrollWidth}
          windowInnerHeight={windowInnerHeight}
          talknPostFixed={talknPostFixed}
          talknPostRight={talknPostRight}
          talknPostWidth={talknPostWidth}
          setLineNavScrollWidth={setLineNavScrollWidth}
          redirectTo={redirectTo}
          updateActiveContent={updateActiveContent}
        />
        <AdvertWrap>
          <Advert />
        </AdvertWrap>
      </Body>
      <Footer
        isSpLayout={isSpLayout}
        isDispFooter={isDispFooter}
        windowInnerHeight={windowInnerHeight}
        redirectTo={redirectTo}
      />
    </Container>
  );
};

export default TalknMedia;

export const getServerSideProps: GetServerSideProps<ReturnServiceType, UrlParamsType> = getServerSidePropsWrap;

type ContainerPropsType = {
  isSpLayout: boolean;
  windowInnerHeight: number;
};

const Container = styled.div<ContainerPropsType>`
  width: 100%;
  padding: 0;
  margin: 0 auto;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    height: ${(props) => props.windowInnerHeight}px;
    overflow: hidden;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    height: 100%;
    overflow: hidden;
  }
`;

const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-width: ${Number(StylesVars.maxWidth) + Number(StylesVars.advertWrapSize) * 2}px;
  margin: 0 auto;
`;

const AdvertWrap = styled.div`
  flex: 1;
  max-width: ${Number(StylesVars.advertWrapSize)}px;
  height: 800px;
  margin-top: 80px;
`;

const Advert = styled.div`
  width: 100%;
  height: 100%;
  background: #cdc;
`;
