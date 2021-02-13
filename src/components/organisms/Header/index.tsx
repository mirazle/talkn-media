import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { MktTypeState } from 'state';
import styled from 'styled-components';

import SelectContentsOrder from 'components/organisms/Header/SelectContentsOrder';
import StylesVars from 'styles/StylesVars';
import { scrollWindowTopAnimation } from 'utils/Animation';

type Props = {
  openSelectContentsOrder: boolean;
  setOpenSelectContentsOrder: React.Dispatch<React.SetStateAction<boolean>>;
  isMaxLayout: boolean;
  isFixedSmallNav: boolean;
  isDispFooter: boolean;
};

const Header: FunctionComponent<Props> = (props: Props) => {
  const [mktType] = useRecoilState(MktTypeState);
  const { openSelectContentsOrder, setOpenSelectContentsOrder, isMaxLayout, isFixedSmallNav, isDispFooter } = props;
  const splitedMktType = mktType.split('-');
  const scrollTo = isDispFooter ? 0 : 1050;
  const arrowMark = isDispFooter ? '▲' : '▼';
  return (
    <Container isFixedSmallNav={isFixedSmallNav}>
      <SelectContentsOrder openSelectContentsOrder={openSelectContentsOrder} isMaxLayout={isMaxLayout} />
      <HeaderContent>
        <div>Back</div>
        <AppName isDispFooter={isDispFooter} onClick={() => scrollWindowTopAnimation(scrollTo)}>
          <TalknLabel>talkn</TalknLabel>
          <NewsLabel>news</NewsLabel>
          <CountryLabel>{`(${splitedMktType[1]})`}</CountryLabel>
          <span className='arrow'>{arrowMark}</span>
        </AppName>
        <MenuWrap>
          <Menu onClick={() => setOpenSelectContentsOrder(!openSelectContentsOrder)} />
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
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${StylesVars.baseHeight}px;
  color: #000;
  border-bottom: ${(props) => (props.isFixedSmallNav ? 0 : 1)}px solid ${StylesVars.bgColor};
  div {
    flex: 1;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  z-index: 10;
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
    color: ${StylesVars.bgColor};
    content: '▼';
    transition: ${StylesVars.transitionDuration};
  }
  &:hover {
    transform: scale(1.03);
    .arrow {
      color: ${StylesVars.themeColor};
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
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  height: 50px;
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
    background: ${StylesVars.bgColor};
    border-radius: 6px;
    box-shadow: 0 12px 0 ${StylesVars.bgColor}, 0 24px 0 ${StylesVars.bgColor};
  }
`;
