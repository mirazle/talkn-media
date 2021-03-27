import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  isMaxLayout: boolean;
  isOpenSearch: boolean;
};

const Search: FunctionComponent<Props> = (props: Props) => {
  return (
    <Container isOpenSearch={props.isOpenSearch} isMaxLayout={props.isMaxLayout}>
      <SearchTextarea />
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
  flex-flow: column nowrap;
  padding: 10px;
  overflow: hidden;
  background: rgba(221, 221, 221, 0.94);
  border-radius: 0 0 2px 2px;
  transition: ${StylesVars.transitionDuration};
  transform: translate(
    ${(props) => (props.isMaxLayout ? 375 : 0)}px,
    ${(props) => (props.isOpenSearch ? `${StylesVars.baseHeight}px` : '-100%')}
  );
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: ${StylesVars.menuSpWidth}px;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: ${StylesVars.menuPcWidth}px;
  }
`;

const SearchTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  font-size: 16px;
  line-height: 16px;
  color: rgb(68, 68, 68);
  resize: none;
  user-select: text;
  background: rgba(230, 230, 230, 0.3);
  border: 0;
  border-radius: 5px;
  outline: 0;
`;
