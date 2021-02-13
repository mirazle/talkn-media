import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType, ContentsValuesType } from 'schema';
import { UrlState } from 'state';
import styled from 'styled-components';

import ImageSliderList, { ImageSliderLayoutType } from 'components/molecules/ImageSliderList';
import StylesVars from 'styles/StylesVars';
import { LocalStorageKeys } from 'utils/Constants';
import { urlToCh } from 'utils/Func';
import { talknScriptHost } from 'utils/Networks';

type Props = {
  contents: ContentsValuesType;
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
};

const getLayout = (isSpLayout: boolean, fixed: boolean): ImageSliderLayoutType => {
  return isSpLayout ? imageSectionNarrowLayouts[Number(fixed)] : imageSectionLayouts[Number(fixed)];
};
const activeScrollCnt = 5;
let scrollCnt = 0;

const getImageSliderUrl = (e: React.UIEvent<HTMLUListElement, UIEvent>): string => {
  const imageScroll = e.target as HTMLElement;
  const scrollLeft = imageScroll?.scrollLeft ? imageScroll?.scrollLeft : 0;
  const clientWidth = imageScroll?.clientWidth ? imageScroll?.clientWidth : 0;
  const index = Math.ceil(scrollLeft / clientWidth);
  const imageScrollLi = document.querySelectorAll('.imageSlider ol li')[index] as HTMLDivElement;
  return imageScrollLi ? String(imageScrollLi.dataset.url) : '';
};

const ImageSlider: FunctionComponent<Props> = (props: Props) => {
  const [url, setUrl] = useRecoilState(UrlState);
  const { contents, isSpLayout, isFixedSmallNav } = props;
  const layout = getLayout(isSpLayout, isFixedSmallNav);
  const [scrollingId, setScrolligId] = React.useState(0);
  const scrollElm = React.useRef<HTMLOListElement>();
  const scrollElmRef = React.useCallback((node: HTMLOListElement) => (scrollElm.current = node), []);

  const onScrollEnd = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if (scrollCnt >= activeScrollCnt) {
      const iframeContainer = document.querySelector('#talknLiveMedia') as HTMLDivElement;
      const iframe = document.querySelector('#talknLiveMedia iframe') as HTMLIFrameElement;
      const url = getImageSliderUrl(e);
      setUrl(url);
      iframeContainer.dataset.url = url;
      iframe.src = `https://${talknScriptHost}${urlToCh(url)}`;
      localStorage.setItem(LocalStorageKeys.url, url);
    }
  };

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>): void => {
    if (scrollingId === 0) {
      scrollCnt = 0;
    } else {
      scrollCnt = scrollCnt + 1;
      clearTimeout(scrollingId);
    }
    setScrolligId(Number(setTimeout(() => onScrollEnd(e), 100)));
  };

  // change url.
  React.useEffect(() => {
    if (scrollElm.current && scrollElm.current.children && url !== '') {
      const scrollOrder = scrollElm.current;
      const index = Array.from(scrollOrder.children).findIndex((child) => {
        const liUrl = String(child.getAttribute('data-url'));
        return liUrl === url;
      });
      const oneScroll = Math.round(scrollOrder.scrollWidth / scrollElm.current.children.length);
      scrollOrder.scrollTo(oneScroll * index, 0);
    }
  }, [url]);
  return (
    <Container className='imageSlider' isSpLayout={isSpLayout} isFixedSmallNav={isFixedSmallNav}>
      <ImageOrderList ref={scrollElmRef} onScroll={onScroll}>
        {Array.from(contents).map((content: ContentsValueType, index: number) => {
          const bg = content.image ? `${content.image.thumbnail.contentUrl}&w=300&dpr=2&qlt=190` : undefined;
          return (
            <ImageSliderList
              key={`${content.url}_${index}`}
              name={content.name}
              description={content.description}
              provider={content.provider[0]['name']}
              url={content.url}
              layout={layout}
              bg={bg}
            />
          );
        })}
      </ImageOrderList>
    </Container>
  );
};

export default ImageSlider;

type ContainerProps = {
  isFixedSmallNav: boolean;
  isSpLayout: boolean;
};

const Container = styled.section<ContainerProps>`
  position: ${(props) => (props.isFixedSmallNav ? 'fixed' : 'relative')};
  top: ${(props) => (props.isFixedSmallNav ? Number(StylesVars.baseHeight) + Number(StylesVars.baseHeight) / 2 : 0)}px;
  z-index: 80;
  width: 100%;
  height: ${(props) => (props.isFixedSmallNav ? Number(StylesVars.baseHeight) * 2 : Number(StylesVars.baseHeight) * 5)}px;
  min-height: ${Number(StylesVars.baseHeight) * 2}px;
  max-height: 300px;
  margin: 0 auto;
  overflow: hidden;
  cursor: pointer;
  transition: ${StylesVars.transitionDuration};
  ol {
    width: 100%;
    max-width: ${StylesVars.maxWidth}px;
    margin: 0 auto;
  }
`;

const ImageOrderList = styled.ol`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  background: rgb(0, 0, 0);
  border-top: 1px solid ${StylesVars.borderColor};
  border-bottom: 1px solid #000;
  scroll-snap-type: x mandatory;
  scroll-snap-points-x: repeat(100%);
`;

const imageSectionNarrowLayouts: ImageSliderLayoutType[] = [
  {
    size: 300,
    style: {
      ImageList: {
        bgPosition: 0,
      },
      ImageListContent: {
        width: '60%',
        height: 'auto',
        paddingTop: '0px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '0px',
        marginTop: '20px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: 'auto',
        borderRadius: '3px 0 0 3px',
      },
      ImageListContentUpper: {
        height: 'auto',
        whiteSpace: 'normal',
      },
      ImageListTitle: {
        marginTop: '10px',
        marginRight: '0px',
        marginBottom: '10px',
        marginLeft: '10px',
        fontSize: '13px',
      },
      ImageListDesc: {
        display: 'block',
        height: 'auto',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '20px',
        fontSize: '10px',
      },
      ImageListProviderTop: {
        display: 'none',
        height: '30px',
        fontSize: '10px',
      },
      ImageListProviderBottom: {
        display: 'inline-flex',
        height: '30px',
        fontSize: '10px',
      },
    },
  },
  {
    size: 120,
    style: {
      ImageList: {
        bgPosition: 0,
      },
      ImageListContent: {
        width: '80%',
        height: '100%',
        paddingTop: '0px',
        paddingRight: '10px',
        paddingBottom: '20px',
        paddingLeft: '10px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: 'auto',
        borderRadius: '0',
      },
      ImageListContentUpper: {
        height: 'auto',
        whiteSpace: 'normal',
      },
      ImageListTitle: {
        marginTop: '8px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        fontSize: '13px',
      },
      ImageListDesc: {
        display: 'block',
        height: '50px',
        paddingTop: '5px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        fontSize: '10px',
      },
      ImageListProviderTop: {
        display: 'none',
        height: '26px',
        fontSize: '10px',
      },
      ImageListProviderBottom: {
        display: 'none',
        height: '34px',
        fontSize: '10px',
      },
    },
  },
];

const imageSectionLayouts: ImageSliderLayoutType[] = [
  {
    size: 300,
    style: {
      ImageList: {
        bgPosition: 60,
      },
      ImageListContent: {
        width: '60%',
        height: 'auto',
        paddingTop: '0px',
        paddingRight: '20px',
        paddingBottom: '20px',
        paddingLeft: '0px',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '0px',
        marginLeft: 'auto',
        borderRadius: '3px',
      },
      ImageListContentUpper: {
        height: 'auto',
        whiteSpace: 'normal',
      },
      ImageListTitle: {
        marginTop: '20px',
        marginRight: '0px',
        marginBottom: '20px',
        marginLeft: '20px',
        fontSize: '18px',
      },
      ImageListDesc: {
        display: 'block',
        height: 'auto',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '20px',
        fontSize: '13px',
      },
      ImageListProviderTop: {
        display: 'none',
        height: '30px',
        fontSize: '13px',
      },
      ImageListProviderBottom: {
        display: 'inline-flex',
        height: '30px',
        fontSize: '13px',
      },
    },
  },
  {
    size: 120,
    style: {
      ImageList: {
        bgPosition: 10,
      },
      ImageListContent: {
        width: '80%',
        height: '100%',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '20px',
        paddingLeft: '0px',
        marginTop: '0px',
        marginRight: '20px',
        marginBottom: '0px',
        marginLeft: 'auto',
        borderRadius: '0',
      },
      ImageListContentUpper: {
        height: '34px',
        whiteSpace: 'normal',
      },
      ImageListTitle: {
        marginTop: '10px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        fontSize: '15px',
      },
      ImageListDesc: {
        display: 'block',
        height: '70px',
        paddingTop: '10px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '20px',
        fontSize: '13px',
      },
      ImageListProviderTop: {
        display: 'inline-flex',
        height: '26px',
        fontSize: '13px',
      },
      ImageListProviderBottom: {
        display: 'none',
        height: '26px',
        fontSize: '13px',
      },
    },
  },
];
