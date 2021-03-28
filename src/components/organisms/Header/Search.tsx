import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import SearchIcon from 'components/atoms/Icon/Search';
import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  isOpenSearch: boolean;
};

const Search: FunctionComponent<Props> = (props: Props) => {
  return (
    <Container isOpenSearch={props.isOpenSearch} isMaxLayout={props.isMaxLayout}>
      <SearchTextarea disabled />
      <SearchIcon focusAnimation={false} />
    </Container>
  );
};

export default Search;

type ContainerType = {
  isMaxLayout: boolean;
  isOpenSearch: boolean;
};

const Container = styled.div<ContainerType>`
  position: fixed;
  top: 0;
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
    ${(props) => (props.isMaxLayout ? 375 : 0)}px,
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

const SearchTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px 10px 0;
  margin: 0 5px;
  font-size: 16px;
  line-height: 16px;
  color: rgb(68, 68, 68);
  resize: none;
  user-select: text;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(248, 248, 248, 1);
  border-radius: 7px;
  outline: 0;
  transition: ${StylesVars.transitionDuration};
  &::placeholder {
    font-size: 16px;
    line-height: 16px;
    color: red;
    text-indent: 3%;
    letter-spacing: 4px;
  }
`;
