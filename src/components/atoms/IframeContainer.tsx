import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ActiveContentState, MediaTypeState } from 'state';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';
import { updateThreadServerMetas } from 'utils/TalknExt';

type Props = {
  url: string;
};

const IframeContainer: FunctionComponent<Props> = (props: Props) => {
  const [mediaType] = useRecoilState(MediaTypeState);
  const [activeContent] = useRecoilState(ActiveContentState);
  // did mount
  React.useEffect(() => {
    console.log('DID MOUNT');
    const talknLiveMediaTag = document.querySelector('#talknLiveMedia');
    if (activeContent && activeContent.image?.thumbnail.contentUrl) {
      const event = () => {
        console.log(activeContent.image?.thumbnail.contentUrl);
        updateThreadServerMetas(mediaType, activeContent.image?.thumbnail.contentUrl);
      };

      if (talknLiveMediaTag) {
        talknLiveMediaTag.addEventListener('loadStateLiveMedia', event);
        return () => {
          talknLiveMediaTag.removeEventListener('loadStateLiveMedia', event);
        };
      }
    }
  }, [activeContent]);
  return <Container data-url={props.url} id='talknLiveMedia' />;
};

export default IframeContainer;

type ContainerPropsType = {
  'data-url': string;
};

const Container = styled.div<ContainerPropsType>`
  width: 100%;
  overflow: hidden;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    height: calc(100% - ${Number(StylesVars.baseHeight) / 2}px);
    scroll-snap-align: start;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    height: 100%;
  }
`;
