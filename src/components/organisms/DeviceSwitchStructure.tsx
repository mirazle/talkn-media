import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType, ContentsValuesType } from 'schema';
import { ActiveContentState } from 'state';
import styled from 'styled-components';

import ImageSlider from 'components/organisms/ImageSlider';
import Main from 'components/organisms/Main';
import ContentsOrder from 'components/organisms/Main/ContentsOrder';
import Navigation from 'components/organisms/Navigation';
import { scrollLeftAnimation } from 'utils/Animation';

type Props = {
  isFixedSmallNav: boolean;
  isSpLayout: boolean;
  contents: ContentsValuesType;
  lineNavScrollWidth: number;
  talknPostFixed: boolean;
  talknPostRight: string;
  talknPostWidth: string;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
  updateActiveContent: (newContent: ContentsValueType) => void;
  setLineNavScrollWidth: React.Dispatch<React.SetStateAction<number>>;
};

const DeviceSwitchStructure: FunctionComponent<Props> = (props) => {
  const [activeContent] = useRecoilState(ActiveContentState);
  const [handScrollMode, setHandScrollMode] = React.useState(true);
  const {
    contents,
    isFixedSmallNav,
    lineNavScrollWidth,
    setLineNavScrollWidth,
    redirectTo,
    updateActiveContent,
    isSpLayout,
    talknPostFixed,
    talknPostRight,
    talknPostWidth,
  } = props;

  // handle on
  const handleOnClickContents = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void => {
    const parentElement = (e.target as HTMLButtonElement).parentElement;
    const clickedUrl = String(parentElement?.dataset.url);
    const imageScroll = document.querySelector('.imageSlider ol');
    const main = document.querySelector('main');

    if (clickedUrl !== activeContent.url) {
      const findIndex = props.contents.findIndex((content) => content.url === clickedUrl);
      updateActiveContent(props.contents[findIndex]);
    }

    imageScroll?.scroll(imageScroll.clientWidth * index, 0);
    if (main && main.scrollLeft === 0) {
      scrollLeftAnimation(main, main.scrollWidth, setHandScrollMode);
    }
  };

  const renderPc = () => {
    return (
      <Container>
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
          handScrollMode={handScrollMode}
          talknPostFixed={talknPostFixed}
          talknPostRight={talknPostRight}
          talknPostWidth={talknPostWidth}
          menuSliderNodes={<ContentsOrder contents={contents} handleOnClickContents={handleOnClickContents} />}
        />
      </Container>
    );
  };

  const renderSp = () => {
    return (
      <Container>
        <Main
          isFixedSmallNav={isFixedSmallNav}
          isSpLayout={isSpLayout}
          contents={contents}
          handScrollMode={handScrollMode}
          talknPostFixed={talknPostFixed}
          talknPostRight={talknPostRight}
          talknPostWidth={talknPostWidth}
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
            </>
          }
        />
      </Container>
    );
  };

  return isSpLayout ? renderSp() : renderPc();
};

export default DeviceSwitchStructure;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;
