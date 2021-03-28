import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ActiveContentState } from 'state';
import styled from 'styled-components';

import NoSsr from 'components/atoms/NoSsr';
import StylesVars from 'styles/StylesVars';
import { getTalknPostTop } from 'utils/Func';

type Props = {
  title: string;
  isSpLayout: boolean;
  talknPostFixed: boolean;
  windowInnerHeight: number;
  talknPostTranslateY: number;
  talknPostRight: number;
  talknPostWidth: number;
};

const Thread: FunctionComponent<Props> = (props: Props) => {
  const [activeContent] = useRecoilState(ActiveContentState);
  if (activeContent.url === '') {
    return null;
  } else {
    const { title, isSpLayout, talknPostFixed, talknPostTranslateY, talknPostRight, talknPostWidth } = props;
    const top = getTalknPostTop();
    return (
      <Container>
        <NoSsr>
          <SpTitle isSpLayout={isSpLayout}>{title}</SpTitle>
          <IframeContainer data-url={activeContent.url} id='talknLiveMedia' />
          <TalknPostWrap
            id='talknLiveMediaPost'
            isSpLayout={isSpLayout}
            talknPostFixed={talknPostFixed}
            translateY={talknPostTranslateY}
            top={top}
            right={talknPostRight}
            width={talknPostWidth}
          />
        </NoSsr>
      </Container>
    );
  }
};

export default Thread;

export const getTalknPostLayout = (
  windowInnerWidth: number,
  isMaxLayout: boolean,
  isSpLayout: boolean,
): { width: number; right: number } => {
  let right = 0;
  let width = 0;
  if (isMaxLayout) {
    right = (windowInnerWidth - Number(StylesVars.maxWidth) + 20) / 2;
    width = Number(StylesVars.maxWidth) / 2 - 20;
  } else {
    if (isSpLayout) {
      width = window.innerWidth;
      right = 0;
    } else {
      width = window.innerWidth / 2 - 20;
      right = 10;
    }
  }
  return { width, right };
};

const Container = styled.div`
  overflow: hidden;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    height: inherit;
    background: #fff;
    scroll-snap-align: start;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
    height: 100%;
  }
`;

type IframeContainerProps = {
  'data-url': string;
};

const IframeContainer = styled.div<IframeContainerProps>`
  width: 100%;
  overflow: hidden;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    height: calc(100vh - ${Number(StylesVars.baseHeight) * 2}px);
    scroll-snap-align: start;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    height: 100%;
  }
`;

type SpTitleType = {
  isSpLayout: boolean;
};

const SpTitle = styled.div<SpTitleType>`
  position: relative;
  width: 100%;
  height: ${Number(StylesVars.baseHeight) / 2}px;
  padding: 0 15px;
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  white-space: nowrap;
  background: #fff;
  border-bottom: 1px solid ${StylesVars.markupColor};
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    display: block;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    display: none;
  }
`;

type TalknPostPropsType = {
  isSpLayout: boolean;
  talknPostFixed: boolean;
  translateY: number;
  top: number;
  right: number;
  width: number;
};

const TalknPostWrap = styled.div<TalknPostPropsType>`
  position: ${(props) => (props.talknPostFixed ? 'fixed' : 'absolute')};
  top: ${(props) => (props.talknPostFixed ? 'unset' : `${props.top}px`)};
  right: ${(props) => props.right}px;
  bottom: ${(props) => (props.talknPostFixed ? '0px' : 'unset')};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => props.width}px;
  max-width: ${(props) => (props.isSpLayout ? props.width : Number(StylesVars.maxWidth) / 2 - 20)}px;
  height: ${Number(StylesVars.talknPostHeight)}px;
  color: #000;
  background: rgba(255, 255, 255, 0.96);
  border-top: 1px solid ${StylesVars.markupColor};
  border-right: ${(props) => (props.isSpLayout ? 0 : `1px solid ${StylesVars.markupColor}`)};
  border-left: ${(props) => (props.isSpLayout ? 0 : `1px solid ${StylesVars.markupColor}`)};
  border-radius: ${(props) => (props.isSpLayout ? 0 : '7px 7px 0 0')};
  transform: translateY(${(props) => (props.isSpLayout ? props.translateY : 0)}px);
`;
