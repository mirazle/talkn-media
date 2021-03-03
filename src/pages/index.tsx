//import Memcached from 'memcached';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { InitComponentProps, ReturnServiceType, UrlParamsType, getServerSidePropsWrap } from 'service';
import { CategoryState, MktTypeState, UrlState } from 'state';
import styled from 'styled-components';

import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import ImageSlider from 'components/organisms/ImageSlider';
import Main from 'components/organisms/Main';
import { getTalknPostLayout } from 'components/organisms/Main/Thread';
import Navigation from 'components/organisms/Navigation';
import StylesVars from 'styles/StylesVars';
import { LocalStorageKeys } from 'utils/Constants';
import { urlToCh } from 'utils/Func';
import { talknScriptHost } from 'utils/Networks';

const navigationScrollClassName = 'navigationScroll';
const talknPostScrollTop = 1113;
const footerScrollTop = 1050;

const TalknMedia: FunctionComponent<InitComponentProps> = (props) => {
  const router = useRouter();

  // disp key datas.
  const [mktType, setMktType] = useRecoilState(MktTypeState);
  const [category, setCategory] = useRecoilState(CategoryState);
  const [url, setUrl] = useRecoilState(UrlState);
  const [contents, setContents] = useState(props.contents);

  // layout total
  const [isSpLayout, setIsSpLayout] = useState(false);
  const [isMaxLayout, setIsMaxLayout] = useState(false);
  const [isFixedSmallNav, setFixedSmallNav] = useState(false);
  const [openSelectContentsOrder, setOpenSelectContentsOrder] = React.useState(false);
  const [lineNavScrollWidth, setLineNavScrollWidth] = React.useState(0);

  // layout talkn post footer TODO: 直す
  const [talknPostWidth, setTalknPostWidth] = useState(String(0));
  const [talknPostRight, setTalknPostRight] = useState(String(0));
  const [talknPostFixed, setTalknPostFixed] = useState(true);
  const [isDispFooter, setIsDispFooter] = useState(false);

  const updateUrl = (url: string) => {
    const iframeContainer = document.querySelector('#talknLiveMedia') as HTMLDivElement;
    const iframe = document.querySelector('#talknLiveMedia iframe') as HTMLIFrameElement;
    setUrl(url);
    if (iframeContainer && iframe) {
      console.log('UPDATE');
      iframeContainer.dataset.url = url;
      iframe.src = `https://${talknScriptHost}${urlToCh(url)}`;
      localStorage.setItem(LocalStorageKeys.url, url);
    }
  };
  const redirectTo = async (mktType: string, category: string): Promise<boolean> => {
    setOpenSelectContentsOrder(false);
    return await router.push(`/${mktType}/${category}`);
  };

  const windowEvents = {
    load: React.useCallback(() => {
      // console.log(window.talknAPI);
    }, []),
    scroll: React.useCallback(() => {
      setFixedSmallNav(window.scrollY >= 90);
      setTalknPostFixed(window.scrollY + window.innerHeight <= talknPostScrollTop);
      setIsDispFooter(window.scrollY >= footerScrollTop);
    }, []),
    resize: React.useCallback(() => {
      const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);
      const _isSpLayout = window.innerWidth < Number(StylesVars.spLayoutWidth);
      const _isMaxLayout = Number(StylesVars.maxWidth) < window.innerWidth;
      setIsSpLayout(_isSpLayout);
      setIsMaxLayout(_isMaxLayout);
      const { width, right } = getTalknPostLayout(window.innerWidth, _isMaxLayout, _isSpLayout);
      setTalknPostWidth(String(width));
      setTalknPostRight(String(right));
      if (navigationScroll) {
        setLineNavScrollWidth(navigationScroll.scrollWidth);
      }
    }, []),
  };

  // did mount
  React.useEffect(() => {
    windowEvents.resize();
    switch (window.document.readyState) {
      case 'interactive':
      case 'complete':
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
    if (url !== props.url) {
      updateUrl(props.url);
    }
    if (cacheUrl && url !== cacheUrl) {
      const findIndex = props.contents.findIndex((content) => content.url === cacheUrl);
      const setUrl = findIndex === -1 ? props.contents[0].url : cacheUrl;
      updateUrl(setUrl);
    }
  }, [props.contents, props.mktType, props.category, props.url]);

  // did update url
  React.useEffect(() => {
    localStorage.setItem(LocalStorageKeys.url, url);
  }, [url]);
  console.log('RENDER');
  return (
    <Container>
      <Header
        isMaxLayout={isMaxLayout}
        isFixedSmallNav={isFixedSmallNav}
        isDispFooter={isDispFooter}
        openSelectContentsOrder={openSelectContentsOrder}
        setOpenSelectContentsOrder={setOpenSelectContentsOrder}
      />
      <Body>
        <AdvertWrap>
          <Advert />
        </AdvertWrap>
        <Content>
          <Navigation
            isSpLayout={isSpLayout}
            isFixedSmallNav={isFixedSmallNav}
            lineNavScrollWidth={lineNavScrollWidth}
            setLineNavScrollWidth={setLineNavScrollWidth}
            redirectTo={redirectTo}
          />
          <ImageSlider contents={contents} isSpLayout={isSpLayout} isFixedSmallNav={isFixedSmallNav} />
          <Main
            isFixedSmallNav={isFixedSmallNav}
            isSpLayout={isSpLayout}
            contents={contents}
            talknPostFixed={talknPostFixed}
            talknPostRight={talknPostRight}
            talknPostWidth={talknPostWidth}
          />
        </Content>
        <AdvertWrap>
          <Advert />
        </AdvertWrap>
      </Body>
      <Footer mktType={mktType} category={category} redirectTo={redirectTo} />
    </Container>
  );
};

export default TalknMedia;

export const getServerSideProps: GetServerSideProps<ReturnServiceType, UrlParamsType> = getServerSidePropsWrap;

const AdvertWrapSize = 300;
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0 auto;
`;

const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-width: ${Number(StylesVars.maxWidth) + AdvertWrapSize * 2}px;
  margin: 0 auto;
`;

const AdvertWrap = styled.div`
  flex: 1;
  max-width: ${AdvertWrapSize}px;
  height: 800px;
  margin-top: 80px;
`;

const Advert = styled.div`
  width: 100%;
  height: 100%;
  background: #cdc;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${StylesVars.maxWidth}px;
`;
