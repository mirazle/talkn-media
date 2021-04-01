import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { CategoryState, MktTypeState } from 'state';
import styled from 'styled-components';

import SearchIcon from 'components/atoms/Icon/Search';
import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  isOpenSearch: boolean;
  redirectTo: (mktType: string, category: string, q: string) => Promise<boolean>;
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const regex = new RegExp(/^\s+$/);
const SearchSection: FunctionComponent<Props> = (props: Props) => {
  const { isMaxLayout, isOpenSearch, redirectTo, setIsOpenSearch } = props;
  const [mktType] = useRecoilState(MktTypeState);
  const [category] = useRecoilState(CategoryState);
  const handleCommonSearchAction = async (input: HTMLInputElement) => {
    if (!regex.test(input.value) && input.value !== '') {
      await redirectTo(mktType, category, input.value);
      input.value = '';
      input.blur();
      setIsOpenSearch(false);
    }
  };
  const handleOnKeyPress = async (e: React.KeyboardEvent): Promise<void> => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      await handleCommonSearchAction(input);
    }
  };
  const handleOnClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
    const icon = (e.target as HTMLAnchorElement).parentElement;
    const inputs = icon?.parentElement?.getElementsByTagName('input');
    if (inputs?.item(0)) {
      const input = inputs?.item(0) as HTMLInputElement;
      await handleCommonSearchAction(input);
    }
  };

  return (
    <Container isOpenSearch={isOpenSearch} isMaxLayout={isMaxLayout}>
      <SearchInput onKeyPress={handleOnKeyPress} />
      <SearchIcon onClick={handleOnClick} />
    </Container>
  );
};

export default SearchSection;

type ContainerType = {
  isMaxLayout: boolean;
  isOpenSearch: boolean;
};

const relativePosition = Number(StylesVars.maxWidth) / 2 - Number(StylesVars.menuPcWidth);
const Container = styled.section<ContainerType>`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 10px;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid rgb(221, 221, 221);
  border-left: 1px solid rgb(221, 221, 221);
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? `calc( 50vw + ${relativePosition}px) ` : '0px')},
    ${(props) => (props.isOpenSearch ? `${StylesVars.baseHeight}px` : '-100%')}
  );
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    right: unset;
    left: 0;
    width: 100vw;
    border-radius: 0;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    right: ${(props) => (props.isMaxLayout ? 'unset' : 0)};
    left: unset;
    width: ${StylesVars.menuPcWidth}px;
    border-radius: 0 0 0 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin: 0 10px;
  overflow: hidden;
  font-size: 16px;
  line-height: 16px;
  color: rgb(68, 68, 68);
  text-indent: 5px;
  letter-spacing: 2px;
  resize: none;
  user-select: text;
  border: 0;
  border-radius: 7px;
  outline: 0;
  transition: ${StylesVars.transitionDuration};
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    background: rgba(220, 220, 220, 0.4);
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    background: rgba(248, 248, 248, 1);
  }
  :hover {
    background: rgba(220, 220, 220, 0.4);
  }
  &::placeholder {
    font-size: 16px;
    line-height: 16px;
    color: rgb(180, 180, 180);
    text-indent: 5px;
    letter-spacing: 2px;
  }
`;
