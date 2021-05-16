import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValuesType } from 'schema';
import { ActiveContentState } from 'state';
import styled from 'styled-components';

import Thread from 'components/organisms/Main/Thread';
import StylesVars from 'styles/StylesVars';

type Props = {
  isFixedSmallNav: boolean;
  isSpLayout: boolean;
  contents: ContentsValuesType;
  windowInnerHeight: number;
  talknPostFixed: boolean;
  talknPostRight: number;
  talknPostWidth: number;
  menuSliderNodes: React.ReactNode;
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setThreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

const getTalknPostTranslateY = (scrollLeft: number, scrollWidth: number): number => {
  const talknPostTranslateYRate = Math.round(((scrollLeft * 2) / scrollWidth) * 100) / 100;
  return -(Number(StylesVars.baseHeight) * talknPostTranslateYRate) + Number(StylesVars.baseHeight);
};

const Main: FunctionComponent<Props> = (props) => {
  const {
    menuSliderNodes,
    isFixedSmallNav,
    isSpLayout,
    windowInnerHeight,
    talknPostFixed,
    talknPostRight,
    talknPostWidth,
    setIsOpenSearch,
    setIsOpenMenu,
    setThreadOnly,
  } = props;
  const activeContent = useRecoilState(ActiveContentState)[0];
  const [talknPostTranslateY, setTalknPostTranslateY] = React.useState(0);

  const onScroll = React.useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
    const main = e.target as HTMLElement;
    const scrollLeft = main?.scrollLeft || 0;
    const scrollWidth = main?.scrollWidth || 0;
    setTalknPostTranslateY(getTalknPostTranslateY(scrollLeft, scrollWidth));
    if (scrollLeft === scrollWidth / 2) {
      setThreadOnly(true);
      setIsOpenSearch(false);
      setIsOpenMenu(false);
    } else if (scrollLeft === 0) {
      setThreadOnly(false);
    }
  }, []);

  React.useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      setTalknPostTranslateY(getTalknPostTranslateY(main?.scrollLeft, main?.scrollWidth));
    }
  }, []);
  return (
    <Container
      isSpLayout={isSpLayout}
      isFixedSmallNav={isFixedSmallNav}
      windowInnerHeight={windowInnerHeight}
      onScroll={onScroll}
    >
      <MenuSliderNodes>{menuSliderNodes}</MenuSliderNodes>
      <Thread
        title={activeContent.name}
        isSpLayout={isSpLayout}
        windowInnerHeight={windowInnerHeight}
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
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
  windowInnerHeight: number;
};

const Container = styled.main<ContainerPropsType>`
  z-index: 0;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background: #fff;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    max-width: 100%;
    height: ${(props) => props.windowInnerHeight}px;
    margin-top: 60px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    max-width: ${StylesVars.maxWidth}px;
    height: ${(props) => props.windowInnerHeight}px;
    min-height: ${(props) => props.windowInnerHeight}px;
    max-height: ${(props) => props.windowInnerHeight}px;
    margin: ${(props) => (props.isFixedSmallNav ? StylesVars.mainLargeFixedMarginTop : 0)}px auto 0;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }
`;

const MenuSliderNodes = styled.div`
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    height: inherit;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-align: start;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
    min-width: 50%;
    height: 100%;
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-align: start;
  }
`;
