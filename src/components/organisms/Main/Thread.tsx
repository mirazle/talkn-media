import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { UrlState } from 'state';
import styled from 'styled-components';

import NoSsr from 'components/atoms/NoSsr';
import StylesVars from 'styles/StylesVars';

type Props = {
  isSpLayout: boolean;
  threadOnlyMode: boolean;
  talknPostFixed: boolean;
  talknPostTranslateY: string;
  talknPostRight: string;
  talknPostWidth: string;
};

const Thread: FunctionComponent<Props> = (props: Props) => {
  const url = useRecoilState(UrlState)[0];
  if (url === '') {
    return <NoSsr />;
  } else {
    const { isSpLayout, threadOnlyMode, talknPostFixed, talknPostTranslateY, talknPostRight, talknPostWidth } = props;
    return (
      <NoSsr>
        <Container data-url={url} id='talknLiveMedia' />
        <TalknPostWrap
          id='talknLiveMediaPost'
          isSpLayout={isSpLayout}
          threadOnlyMode={threadOnlyMode}
          fixed={talknPostFixed}
          translateY={talknPostTranslateY}
          right={talknPostRight}
          width={talknPostWidth}
        />
      </NoSsr>
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

type TalknEmbedProps = {
  'data-url': string;
};

const Container = styled.div<TalknEmbedProps>`
  height: 800px;
  padding-bottom: 60px;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-align: center;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
  }
`;

type TalknPostPropsType = {
  isSpLayout: boolean;
  threadOnlyMode: boolean;
  fixed: boolean;
  translateY: string;
  right: string;
  width: string;
};

const TalknPostWrap = styled.div<TalknPostPropsType>`
  position: ${(props) => (props.fixed ? 'fixed' : 'absolute')};
  top: ${(props) => (props.fixed ? 'unset' : '1050')}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => (props.fixed ? '0' : 'unset')};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => props.width}px;
  max-width: ${(props) => (props.isSpLayout ? props.width : Number(StylesVars.maxWidth) / 2 - 20)}px;
  height: ${Number(StylesVars.baseHeight)}px;
  color: #000;
  background: rgba(255, 255, 255, 0.96);
  border-top: 1px solid ${StylesVars.bgColor};
  border-right: ${(props) => (props.isSpLayout ? 0 : `1px solid ${StylesVars.bgColor}`)};
  border-left: ${(props) => (props.isSpLayout ? 0 : `1px solid ${StylesVars.bgColor}`)};
  border-radius: ${(props) => (props.isSpLayout ? 0 : '7px 7px 0 0')};
  transform: translateY(${(props) => (props.isSpLayout ? props.translateY : 0)}px);
`;
