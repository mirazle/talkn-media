import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { MediaTypeState, MktTypeState } from 'state';
import styled from 'styled-components';
import SweetScroll from 'sweet-scroll';

import BackIcon from 'components/atoms/Icon/Back';
import DetailIcon from 'components/atoms/Icon/Detail';
import MenuIcon from 'components/atoms/Icon/Menu';
import SearchIcon from 'components/atoms/Icon/Search';
import LiveCnt from 'components/atoms/LiveCnt';
import StylesVars from 'styles/StylesVars';
import { scrollWindowTopAnimation } from 'utils/Animation';
import { scrollOptions } from 'utils/Constants';
import { getDispFooterScrollY } from 'utils/Func';
import { getNetwork } from 'utils/Networks';
import { toggleDetail } from 'utils/TalknExt';

type Props = {
  isFixedSmallNav: boolean;
  isDispFooter: boolean;
  isSpLayout: boolean;
  isOpenMenu: boolean;
  isOpenSearch: boolean;
  isThreadOnly: boolean;
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
    isSpLayout,
    isFixedSmallNav,
    isDispFooter,
    isThreadOnly,
    setIsDispFooter,
    setIsOpenMenu,
    setIsOpenSearch,
  } = props;
  const splitedMktType = mktType.split('-');
  const arrowMark = isDispFooter ? '▲' : '▼';
  const handleOnClickBack = () => {
    const main = document.querySelector('main') as HTMLElement;
    const scroller = new SweetScroll(scrollOptions, main);
    scroller.to({ left: 0 });
  };
  const handleOnClickAppName = () => {
    if (isSpLayout) {
      setIsDispFooter(!isDispFooter);
    } else {
      const scrollTo = isDispFooter ? 0 : getDispFooterScrollY();
      scrollWindowTopAnimation(scrollTo);
    }
  };

  const leftIcon = isThreadOnly ? (
    <BackIcon onClick={handleOnClickBack} />
  ) : (
    <MenuIcon onClick={() => setIsOpenMenu(!isOpenMenu)} />
  );

  const rightIcon1 =
    isThreadOnly && isSpLayout ? (
      <DetailIcon className='Detail' onClick={toggleDetail} />
    ) : (
      <SearchIcon className='Search' onClick={() => setIsOpenSearch(!isOpenSearch)} close={props.isOpenSearch} />
    );

  const rightIcon2 = isSpLayout ? undefined : <DetailIcon className='Detail' onClick={toggleDetail} />;

  return (
    <Container isFixedSmallNav={isFixedSmallNav}>
      <HeaderContent>
        <MenuWrapLeft>{leftIcon}</MenuWrapLeft>
        <AppName isDispFooter={isDispFooter} onClick={handleOnClickAppName}>
          <AppNameLabel>talkn</AppNameLabel>
          <MediaTypeLabel>{mediaTypeLabel}</MediaTypeLabel>
          <CountryLabel>{`(${splitedMktType[1]})`}</CountryLabel>
          <span className='arrow'>{arrowMark}</span>
        </AppName>
        <MenuWrapRight>
          <RightIcons isThreadOnly={isThreadOnly}>
            {rightIcon1}
            {rightIcon2}
          </RightIcons>
          <LiveCnt className='LiveCnt' />
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
  z-index: 11;
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
  flex: 1;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MenuWrapRight = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    .LiveCnt {
      position: fixed;
      right: 3vw;
    }
  }
`;

type RightIconsPropsType = {
  isThreadOnly: boolean;
};

const RightIcons = styled.div<RightIconsPropsType>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    .Detail {
      display: ${(props) => (props.isThreadOnly ? 'flex' : 'none')};
    }
    .Search {
      display: ${(props) => (props.isThreadOnly ? 'none' : 'flex')};
    }
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
    min-width: 50%;
    max-width: 50%;
    .Detail {
      display: flex;
    }
    .Search {
      display: flex;
    }
  }
`;
