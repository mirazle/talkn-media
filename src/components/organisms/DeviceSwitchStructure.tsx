import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType, ContentsValuesType } from 'schema';
import { ActiveContentState } from 'state';
import styled from 'styled-components';
import SweetScroll from 'sweet-scroll';

import MessageSection from 'components/organisms/Footer/MessageSection';
import ImageSlider from 'components/organisms/ImageSlider';
import Main from 'components/organisms/Main';
import ContentsOrder from 'components/organisms/Main/ContentsOrder';
import Navigation from 'components/organisms/Navigation';
import StylesVars from 'styles/StylesVars';
import { scrollOptions } from 'utils/Constants';

type Props = {
  isFixedSmallNav: boolean;
  isSpLayout: boolean;
  contents: ContentsValuesType;
  windowInnerHeight: number;
  lineNavScrollWidth: number;
  talknPostFixed: boolean;
  talknPostRight: number;
  talknPostWidth: number;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
  updateActiveContent: (newContent: ContentsValueType) => void;
  setThreadOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setLineNavScrollWidth: React.Dispatch<React.SetStateAction<number>>;
};

const DeviceSwitchStructure: FunctionComponent<Props> = (props) => {
  const [activeContent] = useRecoilState(ActiveContentState);
  const {
    contents,
    isFixedSmallNav,
    lineNavScrollWidth,
    windowInnerHeight,
    setThreadOnly,
    setLineNavScrollWidth,
    redirectTo,
    updateActiveContent,
    isSpLayout,
    talknPostFixed,
    talknPostRight,
    talknPostWidth,
  } = props;

  // handle on
  const handleOnClickContents = (e: React.MouseEvent<HTMLElement, MouseEvent>, index: number): void => {
    const parentElement = (e.target as HTMLButtonElement).parentElement;
    const clickedUrl = String(parentElement?.dataset.url);
    if (clickedUrl !== activeContent.url) {
      const findIndex = props.contents.findIndex((content) => content.url === clickedUrl);
      updateActiveContent(props.contents[findIndex]);
    }

    const imageScroll = document.querySelector('.imageSlider ol');
    const main = document.querySelector('main');
    imageScroll?.scroll(imageScroll.clientWidth * index, 0);
    if (main && main.scrollLeft === 0) {
      const scroller = new SweetScroll(scrollOptions, main);
      scroller.to({ left: main.scrollWidth / 2 });
    }
  };

  const renderPc = () => {
    return (
      <Container windowInnerHeight={windowInnerHeight}>
        <Navigation
          isSpLayout={isSpLayout}
          isFixedSmallNav={isFixedSmallNav}
          lineNavScrollWidth={lineNavScrollWidth}
          setLineNavScrollWidth={setLineNavScrollWidth}
          redirectTo={redirectTo}
        />
        <ImageSlider
          contents={contents}
          isSpLayout={isSpLayout}
          isFixedSmallNav={isFixedSmallNav}
          updateActiveContent={updateActiveContent}
        />
        <Main
          isFixedSmallNav={isFixedSmallNav}
          isSpLayout={isSpLayout}
          contents={contents}
          windowInnerHeight={windowInnerHeight}
          talknPostFixed={talknPostFixed}
          talknPostRight={talknPostRight}
          talknPostWidth={talknPostWidth}
          menuSliderNodes={<ContentsOrder contents={contents} handleOnClickContents={handleOnClickContents} />}
          setThreadOnly={setThreadOnly}
        />
      </Container>
    );
  };

  const renderSp = () => {
    return (
      <Container windowInnerHeight={windowInnerHeight}>
        <Main
          isFixedSmallNav={isFixedSmallNav}
          isSpLayout={isSpLayout}
          contents={contents}
          windowInnerHeight={windowInnerHeight}
          talknPostFixed={talknPostFixed}
          talknPostRight={talknPostRight}
          talknPostWidth={talknPostWidth}
          setThreadOnly={setThreadOnly}
          menuSliderNodes={
            <>
              <Navigation
                isSpLayout={isSpLayout}
                isFixedSmallNav={isFixedSmallNav}
                lineNavScrollWidth={lineNavScrollWidth}
                setLineNavScrollWidth={setLineNavScrollWidth}
                redirectTo={redirectTo}
              />
              <ImageSlider
                contents={contents}
                isSpLayout={isSpLayout}
                isFixedSmallNav={isFixedSmallNav}
                updateActiveContent={updateActiveContent}
              />
              <ContentsOrder contents={contents} handleOnClickContents={handleOnClickContents} />
              <MessageSection />
            </>
          }
        />
      </Container>
    );
  };

  return isSpLayout ? renderSp() : renderPc();
};

export default DeviceSwitchStructure;

type ContainerPropsType = {
  windowInnerHeight: number;
};

const Container = styled.div<ContainerPropsType>`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    height: ${(props) => props.windowInnerHeight}px;
    overflow: hidden;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    height: 100%;
    overflow: hidden;
  }
`;
