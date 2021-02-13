import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValuesType } from 'schema';
import { UrlState } from 'state';
import styled from 'styled-components';

import ContentsOrder from 'components/organisms/Main/ContentsOrder';
import Thread from 'components/organisms/Main/Thread';
import StylesVars from 'styles/StylesVars';
import { scrollLeftAnimation } from 'utils/Animation';
import { LocalStorageKeys } from 'utils/Constants';
import { urlToCh } from 'utils/Func';
import { talknScriptHost } from 'utils/Networks';

type Props = {
  contents: ContentsValuesType;
  isFixedSmallNav: boolean;
  isSpLayout: boolean;
  talknPostFixed: boolean;
  talknPostRight: string;
  talknPostWidth: string;
};

const getTalknPostTranslateY = (scrollLeft: number, scrollWidth: number) => {
  const talknPostTranslateYRate = Math.round(((scrollLeft * 2) / scrollWidth) * 100) / 100;
  const talknPostTranslateY = -(Number(StylesVars.baseHeight) * talknPostTranslateYRate) + Number(StylesVars.baseHeight);
  return String(talknPostTranslateY);
};

const Main: FunctionComponent<Props> = (props) => {
  const setUrl = useRecoilState(UrlState)[1];
  const { contents, isFixedSmallNav, isSpLayout, talknPostFixed, talknPostRight, talknPostWidth } = props;
  const [threadOnlyMode, setThreadOnlyMode] = React.useState(false);
  const [talknPostTranslateY, setTalknPostTranslateY] = React.useState(String(0));
  const [handScrollMode, setHandScrollMode] = React.useState(true);

  // handle on
  const handleOnClickContents = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
    const parentElement = (e.target as HTMLButtonElement).parentElement;
    const clickedUrl = String(parentElement?.dataset.url);
    const imageScroll = document.querySelector('.imageSlider ol');
    const main = document.querySelector('main');
    const iframeContainer = document.querySelector('#talknLiveMedia') as HTMLDivElement;
    const iframe = document.querySelector('#talknLiveMedia iframe') as HTMLIFrameElement;

    setUrl(clickedUrl);
    iframeContainer.dataset.url = clickedUrl;
    iframe.src = `https://${talknScriptHost}${urlToCh(clickedUrl)}`;
    localStorage.setItem(LocalStorageKeys.url, clickedUrl);

    imageScroll?.scroll(imageScroll.clientWidth * index, 0);
    if (main && main.scrollLeft === 0) {
      scrollLeftAnimation(main, main.scrollWidth, setHandScrollMode);
    }
  };

  const onScroll = React.useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
    const main = e.target as HTMLElement;
    const scrollLeft = main?.scrollLeft || 0;
    const scrollWidth = main?.scrollWidth || 0;
    if (scrollLeft === 0) {
      setThreadOnlyMode(false);
    }

    if (scrollWidth / 2 === scrollLeft) {
      setThreadOnlyMode(true);
    }
    setTalknPostTranslateY(getTalknPostTranslateY(scrollLeft, scrollWidth));
  }, []);

  React.useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      setTalknPostTranslateY(getTalknPostTranslateY(main?.scrollLeft, main?.scrollWidth));
    }
  }, []);

  return (
    <Container handScrollMode={handScrollMode} isFixedSmallNav={isFixedSmallNav} onScroll={onScroll}>
      <ContentsOrder contents={contents} handleOnClickContents={handleOnClickContents} />
      <Thread
        isSpLayout={isSpLayout}
        threadOnlyMode={threadOnlyMode}
        talknPostTranslateY={talknPostTranslateY}
        talknPostFixed={talknPostFixed}
        talknPostRight={talknPostRight}
        talknPostWidth={talknPostWidth}
      />
    </Container>
  );
};

export default Main;

type ContainerPropsType = {
  handScrollMode: boolean;
  isFixedSmallNav: boolean;
};

const Container = styled.main<ContainerPropsType>`
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  margin: ${(props) => (props.isFixedSmallNav ? Number(StylesVars.baseHeight) * 5 + 10 : 0)}px auto 0;
  overflow-x: scroll;
  overflow-y: hidden;
  background: #fff;
  scroll-snap-type: ${(props) => (props.handScrollMode ? 'x mandatory' : 'none')};
  scroll-snap-points-x: ${(props) => (props.handScrollMode ? 'repeat(100%)' : 'none')};
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    max-width: 100%;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 100%;
    max-width: ${StylesVars.maxWidth}px;
  }
`;
