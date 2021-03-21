import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { MktTypeState } from 'state';
import styled from 'styled-components';
import SweetScroll from 'sweet-scroll';

import LiveCnt from 'components/atoms/LiveCnt';
import SelectMediaTypeOrder from 'components/organisms/Header/SelectMediaTypeOrder';
import StylesVars from 'styles/StylesVars';
import { scrollWindowTopAnimation } from 'utils/Animation';
import { scrollOptions } from 'utils/Constants';
import { getDispFooterScrollY } from 'utils/Func';
import { talknScriptHost } from 'utils/Networks';

type Props = {
  isMaxLayout: boolean;
  isFixedSmallNav: boolean;
  isDispFooter: boolean;
  isSpLayout: boolean;
  openSelectMediaTypeOrder: boolean;
  setIsDispFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSelectMediaTypeOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FunctionComponent<Props> = (props: Props) => {
  const [mktType] = useRecoilState(MktTypeState);
  // const activeContent = useRecoilState(ActiveContentState)[0];
  const {
    openSelectMediaTypeOrder,
    setIsDispFooter,
    setOpenSelectMediaTypeOrder,
    isSpLayout,
    isMaxLayout,
    isFixedSmallNav,
    isDispFooter,
  } = props;
  const splitedMktType = mktType.split('-');
  const arrowMark = isDispFooter ? '▲' : '▼';
  const handleOnClickBack = () => {
    const main = document.querySelector('main') as HTMLElement;
    const scrollLeft = main?.scrollLeft || 0;
    if (scrollLeft === 0) {
      // const ch = urlToCh(activeContent.url);
      // location.href = `https://${talknScriptHost}${ch}`;
      location.href = `https://${talknScriptHost}`;
    } else {
      const scroller = new SweetScroll(scrollOptions, main);
      scroller.to({ left: 0 });
    }
  };
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
      <SelectMediaTypeOrder openSelectMediaTypeOrder={openSelectMediaTypeOrder} isMaxLayout={isMaxLayout} />
      <HeaderContent>
        <MenuWrap>
          <BackAnchor onClick={handleOnClickBack}>
            <Back />
          </BackAnchor>
        </MenuWrap>
        <AppName isDispFooter={isDispFooter} onClick={handleOnClickAppName}>
          <TalknLabel>talkn</TalknLabel>
          <NewsLabel>news</NewsLabel>
          <CountryLabel>{`(${splitedMktType[1]})`}</CountryLabel>
          <span className='arrow'>{arrowMark}</span>
        </AppName>
        <MenuWrap>
          <Menu onClick={() => setOpenSelectMediaTypeOrder(!openSelectMediaTypeOrder)} />
          <LiveCnt />
        </MenuWrap>
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
  max-width: ${StylesVars.maxWidth}px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
`;

type AppNamePropsType = {
  isDispFooter: boolean;
};

const AppName = styled.div<AppNamePropsType>`
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

const TalknLabel = styled.span`
  margin: 0 5px;
  font-weight: 200;
  color: #000;
`;

const NewsLabel = styled.span`
  margin-right: 5px;
  font-weight: 300;
  color: rgba(79, 174, 159, 1);
`;

const CountryLabel = styled.span`
  position: relative;
  top: -2px;
  font-size: 10px;
  font-weight: 300;
  color: #000;
`;

const MenuWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  position: relative;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
  }
  &::before {
    position: relative;
    top: -12px;
    width: 8px;
    height: 8px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 6px;
    box-shadow: 0 12px 0 ${StylesVars.markupColor}, 0 24px 0 ${StylesVars.markupColor};
  }
`;

const BackAnchor = styled.a`
  display: block;
  width: 50px;
  height: 50px;
`;

const Back = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
  }
  &::before {
    position: relative;
    top: -4px;
    left: 5px;
    width: 14px;
    height: 4px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 4px;
    transform: rotate(-45deg);
  }
  &::after {
    position: relative;
    top: 5px;
    left: -8px;
    width: 14px;
    height: 4px;
    content: '';
    background: ${StylesVars.markupColor};
    border-radius: 4px;
    transform: rotate(45deg);
  }
`;
