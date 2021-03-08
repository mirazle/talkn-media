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
  handScrollMode: boolean;
  talknPostFixed: boolean;
  talknPostRight: string;
  talknPostWidth: string;
  menuSliderNodes: React.ReactNode;
};

const getTalknPostTranslateY = (scrollLeft: number, scrollWidth: number) => {
  const talknPostTranslateYRate = Math.round(((scrollLeft * 2) / scrollWidth) * 100) / 100;
  const talknPostTranslateY = -(Number(StylesVars.baseHeight) * talknPostTranslateYRate) + Number(StylesVars.baseHeight);
  return String(talknPostTranslateY);
};

const Main: FunctionComponent<Props> = (props) => {
  const {
    menuSliderNodes,
    isFixedSmallNav,
    isSpLayout,
    handScrollMode,
    talknPostFixed,
    talknPostRight,
    talknPostWidth,
  } = props;
  const [activeContent] = useRecoilState(ActiveContentState);
  const [threadOnlyMode, setThreadOnlyMode] = React.useState(false);
  const [talknPostTranslateY, setTalknPostTranslateY] = React.useState(String(0));

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
    <Container handScrollMode={handScrollMode} isSpLayout={isSpLayout} isFixedSmallNav={isFixedSmallNav} onScroll={onScroll}>
      <MenuSliderNodes>{menuSliderNodes}</MenuSliderNodes>
      <Thread
        title={activeContent.name}
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
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
};

const Container = styled.main<ContainerPropsType>`
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  margin: ${(props) => (props.isSpLayout ? 60 : props.isFixedSmallNav ? 210 : 0)}px auto 0;
  overflow-x: ${(props) => (props.isSpLayout ? 'scroll' : 'hidden')};
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

// TODO: 800px to device height - header size.
const MenuSliderNodes = styled.div`
  height: 100%;
  background: #ddd;
  scroll-snap-align: center;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
  }
`;
