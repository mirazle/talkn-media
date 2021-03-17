import ForeignIcon from 'assets/foreign.svg';
import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';
import { LocalStorageKeys } from 'utils/Constants';

export type ImageSliderLayoutType = {
  size: number;
  style: {
    ImageList: {
      bgPosition: number;
    };
    ImageListContent: {
      width: string;
      height: string;
      paddingTop: string;
      paddingRight: string;
      paddingBottom: string;
      paddingLeft: string;
      marginTop: string;
      marginRight: string;
      marginBottom: string;
      marginLeft: string;
      borderRadius: string;
    };
    ImageListContentUpper: {
      height: string;
      whiteSpace: string;
    };
    ImageListTitle: {
      marginTop: string;
      marginRight: string;
      marginBottom: string;
      marginLeft: string;
      fontSize: string;
    };
    ImageListDesc: {
      display: string;
      height: string;
      paddingTop: string;
      paddingRight: string;
      paddingBottom: string;
      paddingLeft: string;
      fontSize: string;
    };
    ImageListProviderTop: {
      display: string;
      height: string;
      fontSize: string;
    };
    ImageListProviderBottom: {
      display: string;
      height: string;
      fontSize: string;
    };
  };
};

type Props = {
  name: string;
  description: string;
  provider: string;
  url: string;
  layout: ImageSliderLayoutType;
  bg?: string;
};

const ImageSliderList: FunctionComponent<Props> = (props: Props) => {
  const { name, description, provider, url, layout, bg } = props;
  const handleOnClick = () => {
    location.href = url;
    localStorage.setItem(LocalStorageKeys.url, url);
  };
  return (
    <Container data-url={url} onClick={handleOnClick}>
      <ImageListBackground href={url} bg={bg} layout={layout.style.ImageList}>
        <ImageListContent layout={layout.style.ImageListContent}>
          <ImageListContentUpper layout={layout.style.ImageListContentUpper}>
            <ImageListProviderTop className='provider' layout={layout.style.ImageListProviderTop}>
              {provider}
            </ImageListProviderTop>
            <ImageListTitle layout={layout.style.ImageListTitle}>{name}</ImageListTitle>
          </ImageListContentUpper>
          <ImageListDesc layout={layout.style.ImageListDesc}>{description}...</ImageListDesc>
        </ImageListContent>
        <ImageListBottom>
          <ForeignIcon />
          <ImageListProviderBottom className='provider' layout={layout.style.ImageListProviderBottom}>
            {provider}
          </ImageListProviderBottom>
        </ImageListBottom>
      </ImageListBackground>
    </Container>
  );
};

export default ImageSliderList;

const Container = styled.li`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-width: 100%;
  margin: 0;
  overflow: hidden;
  text-align: right;
  scroll-snap-align: center;
  svg {
    width: 26px;
    height: 26px;
    opacity: 1;
    & *:not([stroke='none' i]) {
      fill: #fff;
    }
  }
`;

type ImageListBackgroundPropsType = {
  bg?: string;
  layout: {
    bgPosition: number;
  };
};

const ImageListBackground = styled.a<ImageListBackgroundPropsType>`
  display: block;
  width: 100%;
  min-width: 100%;
  height: 100%;
  ${(props) =>
    props.bg ? `background: #000 url(${props.bg}) ${props.layout?.bgPosition}px / contain no-repeat;` : 'background: #000;'}
  transition: ${StylesVars.transitionDuration};
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    &:hover {
      transform: scale(1.02);
      .provider {
        color: #000;
        background: #fff;
      }
    }
  }
`;

type ImageListContentPropsType = {
  layout: {
    width: string;
    height: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
    borderRadius: string;
  };
};

const ImageListContent = styled.div<ImageListContentPropsType>`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  width: ${(props) => props.layout.width};
  height: ${(props) => props.layout.height};
  max-height: 240px;
  padding-top: ${(props) => props.layout.paddingTop};
  padding-right: ${(props) => props.layout.paddingRight};
  padding-bottom: ${(props) => props.layout.paddingBottom};
  padding-left: ${(props) => props.layout.paddingLeft};
  margin-top: ${(props) => props.layout.marginTop};
  margin-right: ${(props) => props.layout.marginRight};
  margin-bottom: ${(props) => props.layout.marginBottom};
  margin-left: ${(props) => props.layout.marginLeft};
  font-size: 13px;
  color: #fff;
  text-align: right;
  background: rgba(0, 0, 0, 0.6);
  border-radius: ${(props) => props.layout.borderRadius};
`;

type ImageListContentUpperPropsType = {
  layout: {
    whiteSpace: string;
    height: string;
  };
};

const ImageListContentUpper = styled.div<ImageListContentUpperPropsType>`
  display: flex;
  height: ${(props) => props.layout.height};
  white-space: ${(props) => props.layout.whiteSpace};
`;

type ImageListTitlePropsType = {
  layout: {
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
    fontSize: string;
  };
};

const ImageListTitle = styled.div<ImageListTitlePropsType>`
  width: 100%;
  height: 50px;
  margin-top: ${(props) => props.layout.marginTop};
  margin-right: ${(props) => props.layout.marginRight};
  margin-bottom: ${(props) => props.layout.marginBottom};
  margin-left: ${(props) => props.layout.marginLeft};
  overflow: hidden;
  font-size: ${(props) => props.layout.fontSize};
  font-weight: 600;
`;

type ImageListDescPropsType = {
  layout: {
    display: string;
    height: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    fontSize: string;
  };
};

const ImageListDesc = styled.div<ImageListDescPropsType>`
  display: ${(props) => props.layout.display};
  height: ${(props) => props.layout.height};
  padding-top: ${(props) => props.layout.paddingTop};
  padding-right: ${(props) => props.layout.paddingRight};
  padding-bottom: ${(props) => props.layout.paddingBottom};
  padding-left: ${(props) => props.layout.paddingLeft};
  overflow: hidden;
  font-size: ${(props) => props.layout.fontSize};
`;

type ImageListProviderPropsType = {
  layout: {
    display: string;
    height: string;
    fontSize: string;
  };
};

const ImageListProviderTop = styled.div<ImageListProviderPropsType>`
  display: ${(props) => props.layout.display};
  align-items: center;
  justify-content: center;
  height: ${(props) => props.layout.height};
  min-height: ${(props) => props.layout.height};
  max-height: ${(props) => props.layout.height};
  padding: 0 20px;
  margin: 10px 20px 0;
  font-size: ${(props) => props.layout.fontSize};
  color: #fff;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #fff;
  border-radius: 20px;
  transition: ${StylesVars.transitionDuration};
`;

const ImageListBottom = styled.div`
  display: inline-flex;
  margin: 1% 30px 30px 30px;
`;

const ImageListProviderBottom = styled.div<ImageListProviderPropsType>`
  display: ${(props) => props.layout.display};
  align-items: center;
  justify-content: center;
  height: ${(props) => props.layout.height};
  min-height: ${(props) => props.layout.height};
  max-height: ${(props) => props.layout.height};
  padding: 0 20px;
  margin-left: 20px;
  font-size: ${(props) => props.layout.fontSize};
  color: #fff;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #fff;
  border-radius: 10px;
  transition: ${StylesVars.transitionDuration};
`;
