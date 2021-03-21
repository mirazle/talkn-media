import sitemapJson from 'json/news/sitemap.json';
import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { Category, NewsSitemap } from 'schema/NewsSitemap';
import { CategoryState, MktTypeState } from 'state';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  lineNavScrollWidth: number;
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
  setLineNavScrollWidth: React.Dispatch<React.SetStateAction<number>>;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
  categories: Category[];
};

const navigationScrollClassName = 'navigationScroll';

const LineNavigation: FunctionComponent<Props> = (props: Props) => {
  const { isSpLayout, lineNavScrollWidth, setLineNavScrollWidth, categories, isFixedSmallNav, redirectTo } = props;
  const [mktType] = useRecoilState(MktTypeState);
  const [category] = useRecoilState(CategoryState);
  const setNavScrollIndex = React.useState(0)[1];
  const [scrollingId, setScrolligId] = React.useState(0);
  const menus: Category[] = categories.concat(categories).concat(categories);

  const onScrollEnd = async (mktType: string): Promise<void> => {
    const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);
    if (navigationScroll) {
      if (lineNavScrollWidth === navigationScroll.scrollWidth) {
        if (scrollingId > 0) {
          const scrollY = window.scrollY;
          const sitemap = sitemapJson.find((sitemap: NewsSitemap) => sitemap.Market === mktType);
          const categories: Category[] | [] = sitemap ? sitemap.Categories : [];
          const lineMenus: Category[] = categories.concat(categories).concat(categories);
          const oneScroll = Math.round(lineNavScrollWidth / lineMenus.length);
          const scrollPosCnt = Math.round(navigationScroll.scrollLeft / oneScroll);
          const scrollNavIndex = scrollPosCnt + 2;
          const category = lineMenus[scrollNavIndex].category;
          await redirectTo(mktType, category);

          // scroll.
          window.scrollTo(0, scrollY);
          setScrolligId(0);
          setNavScrollIndex(Number(scrollNavIndex));
        }
      }
    }
    return Promise.resolve();
  };

  const onScroll = () => {
    if (scrollingId > 0) clearTimeout(scrollingId);

    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    setScrolligId(Number(setTimeout(() => onScrollEnd(mktType), 100)));
  };

  // did update.
  React.useEffect(() => {
    const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);
    if (navigationScroll) {
      const scrollNavIndex = menus.findIndex((menu, i) => menu.category === category && i > categories.length);
      const oneScroll = Math.round(lineNavScrollWidth / menus.length);
      navigationScroll.scrollTo((scrollNavIndex - 2) * oneScroll, 0);
      setLineNavScrollWidth(navigationScroll.scrollWidth);
      setNavScrollIndex(scrollNavIndex);
    }
  }, [lineNavScrollWidth, category]);

  return (
    <Container isSpLayout={isSpLayout} isFixedSmallNav={isFixedSmallNav}>
      <ul className={navigationScrollClassName} onScroll={onScroll}>
        {menus.map((menu, i) => {
          const key = menu.label + String(i);
          const className = menu.category === category ? 'active' : '';
          return (
            <li key={key} className={className}>
              <button onClick={() => redirectTo(mktType, menu.category)}>
                <label>{menu.label}</label>
              </button>
              <div className='lamp'>&nbsp;</div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default LineNavigation;

type ContainerProps = {
  isSpLayout: boolean;
  isFixedSmallNav: boolean;
};

const Container = styled.nav<ContainerProps>`
  position: ${(props) => (props.isSpLayout ? 'relative' : props.isFixedSmallNav ? 'fixed' : 'relative')};
  top: ${(props) => (props.isSpLayout ? 0 : props.isFixedSmallNav ? `${StylesVars.baseHeight}px` : 0)};
  z-index: 1;
  width: 100%;
  height: 30px;
  transition: ${StylesVars.transitionDuration};
  ul {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    max-width: ${StylesVars.maxWidth}px;
    height: 100%;
    margin: 0 auto;
    overflow-y: hidden;
    background: #fff;
    scroll-snap-type: x mandatory;
    scroll-snap-points-x: repeat(100%);
  }
  li {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 20%;
    min-width: 20%;
    height: 22px;
    scroll-snap-align: center;
  }
  li button {
    height: 100%;
    cursor: pointer;
    background: rgba(255, 255, 255, 0);
    border: 0;
    outline: 0;
    @media (max-width: ${StylesVars.spLayoutWidth}px) {
      width: 80%;
      font-size: 12px;
    }
    @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
      width: 60%;
    }
  }
  li button label {
    cursor: pointer;
  }
  li.active button {
    font-weight: 500;
    color: #fff;
    background: rgba(79, 174, 159, 1);
    border-radius: 10px;
  }
`;
