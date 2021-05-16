import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType } from 'schema';
import { InitComponentProps, ReturnServiceType, UrlParamsType, getServerSidePropsWrap } from 'service';
import { ActiveContentState, CategoryState, MediaTypeState, MktTypeState } from 'state';
import styled from 'styled-components';

import DeviceSwitchStructure from 'components/organisms/DeviceSwitchStructure';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import { getTalknPostLayout } from 'components/organisms/Main/Thread';
import MenuSection from 'components/organisms/Menu';
import SearchSection from 'components/organisms/SearchSection';
import CommonHead from 'components/templates/CommonHead';
import StylesVars from 'styles/StylesVars';
import { LocalStorageKeys, mailBackHash } from 'utils/Constants';
import { getIsSpLayout, getTalknPostFixed, updateBaseLayout, urlToCh } from 'utils/Func';
import { talknLiveMediaHost } from 'utils/Networks';

const navigationScrollClassName = 'navigationScroll';

const TalknMedia: FunctionComponent<InitComponentProps> = (props) => {
  const router = useRouter();

  // disp key datas.
  const [mediaType, setMediaType] = useRecoilState(MediaTypeState);
  const [mktType, setMktType] = useRecoilState(MktTypeState);
  const [category, setCategory] = useRecoilState(CategoryState);
  const [contents, setContents] = useState(props.contents);
  const [activeContent, setActiveContent] = useRecoilState(ActiveContentState);

  // layout total
  const [isSpLayout, setIsSpLayout] = useState(false);
  const [isMaxLayout, setIsMaxLayout] = useState(false);
  const [isFixedSmallNav, setFixedSmallNav] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [windowInnerHeight, setWindowInnerHeight] = useState(0);
  const [lineNavScrollWidth, setLineNavScrollWidth] = useState(0);

  const [talknPostWidth, setTalknPostWidth] = useState(0);
  const [talknPostRight, setTalknPostRight] = useState(0);
  const [talknPostFixed, setTalknPostFixed] = useState(true);

  // mode
  const [isDispFooter, setIsDispFooter] = useState(false);
  const [isThreadOnly, setThreadOnly] = useState(false);

  const updateActiveContent = (newContent: ContentsValueType, updateIframe = true) => {
    if (newContent && newContent.url !== activeContent.url) {
      setActiveContent(newContent);
      if (updateIframe) {
        const iframeContainer = document.querySelector('#talknLiveMedia') as HTMLDivElement;
        const iframe = document.querySelector('#talknLiveMedia iframe') as HTMLIFrameElement;

        if (iframeContainer && iframe) {
          iframeContainer.dataset.url = newContent.url;
          iframe.src = `https://${talknLiveMediaHost}${urlToCh(newContent.url)}`;
          localStorage.setItem(LocalStorageKeys.url, newContent.url);
        }
      }
    }
  };

  const redirectTo = async (mktType: string, category: string, q?: string): Promise<boolean> => {
    setIsOpenMenu(false);
    setIsDispFooter(false);
    const path = q ? `/${mktType}?q=${q}` : `/${mktType}/${category}`;
    return await router.push(path);
  };

  const windowEvents = {
    load: React.useCallback(() => {
      const _isSpLayout = getIsSpLayout();
      const _fixedSmallNav = window.scrollY > Number(StylesVars.switchSmallNavScrollY);
      setWindowInnerHeight(window.innerHeight);
      setIsSpLayout(_isSpLayout);
      setFixedSmallNav(_fixedSmallNav || _isSpLayout);
      setIsDispFooter(location.hash === mailBackHash);
    }, []),
    scroll: React.useCallback(() => {
      const _isSpLayout = getIsSpLayout();
      const _fixedSmallNav = window.scrollY > Number(StylesVars.switchSmallNavScrollY);
      setIsSpLayout(_isSpLayout);
      setFixedSmallNav(_fixedSmallNav || _isSpLayout);
      setTalknPostFixed(getTalknPostFixed(_isSpLayout, _fixedSmallNav));
      if (!_isSpLayout) {
        setIsDispFooter(window.scrollY >= Number(StylesVars.footerScrollTop));
      }
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
      setTalknPostFixed(getTalknPostFixed(_isSpLayout, _fixedSmallNav));
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
    const { contents: propsContents, requests } = props;
    const cacheUrl = localStorage.getItem(LocalStorageKeys.url);
    if (propsContents !== contents) setContents(propsContents);
    if (mediaType !== requests.mediaType) setMediaType(requests.mediaType);
    if (mktType !== requests.mktType) setMktType(requests.mktType);
    if (category !== requests.category) setCategory(requests.category);
    if (activeContent.url !== requests.url) {
      const findIndex = propsContents.findIndex((content) => content.url === requests.url);
      const _activeContent: ContentsValueType = propsContents[findIndex];
      updateActiveContent(_activeContent);
    }

    if (cacheUrl && activeContent.url !== cacheUrl) {
      const _findIndex = propsContents.findIndex((content) => content.url === cacheUrl);
      const findIndex = _findIndex === -1 ? 0 : _findIndex;
      const _activeContent: ContentsValueType = propsContents[findIndex];
      updateActiveContent(_activeContent);
    }
  }, [props.contents, props.requests]);

  // did update url
  React.useEffect(() => {
    localStorage.setItem(LocalStorageKeys.url, activeContent.url);
  }, [activeContent.url]);

  return (
    <>
      <CommonHead
        mediaType={mediaType}
        title='talkn news | 今日のニュースを誰かと話そう'
        description='talkn newsはリアルタイムなコミニュケーションをしながらニュース閲覧出来るサイトです。今、閲覧しているニュースを「何人が見ているか」が分かるので、臨場感を持ってコミニュケーションを楽しめます。'
        thumbnailUrl='/ogp/jp.png'
        ogThumbnailUrl='/ogp/jp.png'
      />
      <Container isSpLayout={isSpLayout} windowInnerHeight={windowInnerHeight}>
        <Header
          isFixedSmallNav={isFixedSmallNav}
          isDispFooter={isDispFooter}
          isSpLayout={isSpLayout}
          isOpenMenu={isOpenMenu}
          isOpenSearch={isOpenSearch}
          isThreadOnly={isThreadOnly}
          setIsOpenMenu={setIsOpenMenu}
          setIsOpenSearch={setIsOpenSearch}
          setIsDispFooter={setIsDispFooter}
        />
        <MenuSection isOpenMenu={isOpenMenu} isMaxLayout={isMaxLayout} />
        <SearchSection
          redirectTo={redirectTo}
          isOpenSearch={isOpenSearch}
          isMaxLayout={isMaxLayout}
          setIsOpenSearch={setIsOpenSearch}
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
            setIsOpenSearch={setIsOpenSearch}
            setIsOpenMenu={setIsOpenMenu}
            setThreadOnly={setThreadOnly}
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
    </>
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
