import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { MediaTypeState, MktTypeState } from 'state';
import styled from 'styled-components';

import DetailIcon from 'components/atoms/Icon/Detail';
import SearchIcon from 'components/atoms/Icon/Search';
import LiveCnt from 'components/atoms/LiveCnt';
import Menu from 'components/organisms/Header/Menu';
import Search from 'components/organisms/Header/Search';
import StylesVars from 'styles/StylesVars';
import { scrollWindowTopAnimation } from 'utils/Animation';
import { getDispFooterScrollY } from 'utils/Func';
import { getNetwork } from 'utils/Networks';

type Props = {
  isFixedSmallNav: boolean;
  isDispFooter: boolean;
  isSpLayout: boolean;
  isOpenMenu: boolean;
  isOpenSearch: boolean;
  isMaxLayout: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDispFooter: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FunctionComponent<Props> = (props: Props) => {
  const [mediaType] = useRecoilState(MediaTypeState);
  const [mktType] = useRecoilState(MktTypeState);
  const mediaTypeLabel = getNetwork(mediaType).label.toLowerCase();
  const {
    isOpenMenu,
    isOpenSearch,
    isMaxLayout,
    isSpLayout,
    isFixedSmallNav,
    isDispFooter,
    setIsDispFooter,
    setIsOpenMenu,
    setIsOpenSearch,
  } = props;
  const splitedMktType = mktType.split('-');
  const arrowMark = isDispFooter ? '▲' : '▼';
  /*
  const handleOnClickBack = () => {
    const main = document.querySelector('main') as HTMLElement;
    const scrollLeft = main?.scrollLeft || 0;
    if (scrollLeft === 0) {
      location.href = `https://${talknLiveMediaHost}`;
    } else {
      const scroller = new SweetScroll(scrollOptions, main);
      scroller.to({ left: 0 });
    }
  };
  */
  const handleOnClickAppName = () => {
    if (isSpLayout) {
      setIsDispFooter(!isDispFooter);
    } else {
      const scrollTo = isDispFooter ? 0 : getDispFooterScrollY();
      scrollWindowTopAnimation(scrollTo);
    }
  };

  return (
    <Container isFixedSmallNav={isFixedSmallNav}>
      {/* レイアウト上headerの中に収める必要があるためここに配置(PCだとfixedで画面端に表示されてしまう) */}
      <Menu isOpenMenu={isOpenMenu} isMaxLayout={isMaxLayout} />
      <Search isOpenSearch={isOpenSearch} isMaxLayout={isMaxLayout} />
      <HeaderContent>
        <MenuWrapLeft>
          <DetailIcon onClick={() => setIsOpenMenu(!isOpenMenu)} />
        </MenuWrapLeft>
        <AppName isDispFooter={isDispFooter} onClick={handleOnClickAppName}>
          <AppNameLabel>talkn</AppNameLabel>
          <MediaTypeLabel>{mediaTypeLabel}</MediaTypeLabel>
          <CountryLabel>{`(${splitedMktType[1]})`}</CountryLabel>
          <span className='arrow'>{arrowMark}</span>
        </AppName>
        <MenuWrapRight>
          <SearchIcon onClick={() => setIsOpenSearch(!isOpenSearch)} close={props.isOpenSearch} />
          <LiveCnt />
        </MenuWrapRight>
      </HeaderContent>
    </Container>
  );
};

export default Header;

type ContainerPropsType = {
  isFixedSmallNav: boolean;
};

const Container = styled.header<ContainerPropsType>`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${StylesVars.headerHeight}px;
  color: #000;
  border-bottom: ${(props) => (props.isFixedSmallNav ? 0 : 1)}px solid ${StylesVars.markupColor};
  div {
    flex: 1;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  z-index: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${StylesVars.maxWidth}px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
`;

type AppNamePropsType = {
  isDispFooter: boolean;
};

const AppName = styled.h1<AppNamePropsType>`
  font-size: 20px;
  cursor: pointer;
  transition: ${StylesVars.transitionDuration};
  .arrow {
    width: 10px;
    height: 10px;
    margin-left: 3px;
    font-size: 14px;
    color: ${StylesVars.markupColor};
    content: '▼';
    transition: ${StylesVars.transitionDuration};
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    &:hover {
      transform: scale(1.03);
      .arrow {
        color: ${StylesVars.themeColor};
      }
    }
  }
`;

const AppNameLabel = styled.label`
  margin: 0 5px;
  font-weight: 200;
  color: #000;
`;

const MediaTypeLabel = styled.label`
  margin-right: 5px;
  font-weight: 300;
  color: rgba(79, 174, 159, 1);
`;

const CountryLabel = styled.label`
  position: relative;
  top: -2px;
  font-size: 10px;
  font-weight: 300;
  color: #000;
`;

const MenuWrapLeft = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const MenuWrapRight = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;
