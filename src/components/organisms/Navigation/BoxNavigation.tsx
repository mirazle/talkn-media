import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { Category } from 'schema/NewsSitemap';
import { CategoryState, MktTypeState } from 'state';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import StylesVars from 'styles/StylesVars';

type Props = {
  categories: Category[] | [];
  lineNavScrollWidth: number;
  setLineNavScrollWidth: React.Dispatch<React.SetStateAction<number>>;
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const BoxNavigation: FunctionComponent<Props> = (props: Props) => {
  const [mktType] = useRecoilState(MktTypeState);
  const [category] = useRecoilState(CategoryState);
  const { categories, isFixedSmallNav, redirectTo } = props;
  return (
    <Container isFixedSmallNav={isFixedSmallNav}>
      <ul>
        {Array.from(categories).map((c: Category) => {
          const active = c.category === category;
          return <BoxList key={c.category} label={c.label} active={active} onClick={() => redirectTo(mktType, c.category)} />;
        })}
      </ul>
    </Container>
  );
};

export default BoxNavigation;

type ContainerProps = {
  isFixedSmallNav: boolean;
};

const Container = styled.nav<ContainerProps>`
  position: ${(props) => (props.isFixedSmallNav ? 'fixed' : 'relative')};
  top: ${(props) => (props.isFixedSmallNav ? `${StylesVars.headerHeight}px` : 0)};
  z-index: 1;
  width: 100%;
  max-width: ${StylesVars.maxWidth}px;
  height: ${Number(StylesVars.boxNavHeight)}px;
  min-height: ${Number(StylesVars.boxNavHeight)}px;
  margin: ${(props) => (props.isFixedSmallNav ? 0 : StylesVars.headerHeight)}px auto 0;
  overflow: hidden;
  transition: ${StylesVars.transitionDuration};
  ul {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(5, minmax(20%, 1fr));
    gap: 1px;
    height: 100%;
    overflow: hidden;
  }
`;
