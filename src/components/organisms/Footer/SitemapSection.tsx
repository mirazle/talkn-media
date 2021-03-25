import sitemap from 'json/news/sitemap.json';
import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { Category, NewsSitemap } from 'schema/NewsSitemap';
import { MediaTypeState } from 'state';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';
import StylesVars from 'styles/StylesVars';
import { getMyHost } from 'utils/Networks';

type Props = {
  mktType: string;
  category: string;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const SitemapSection: FunctionComponent<Props> = (props: Props) => {
  const mediaType = useRecoilState(MediaTypeState)[0];
  const { mktType, category } = props;
  const siteMap = sitemap as NewsSitemap[];
  return (
    <Container>
      <h2>- Sitemap -</h2>
      {siteMap.map((countryDatas: NewsSitemap) => {
        const country = countryDatas.Country;
        const categories = countryDatas.Categories.map((c: Category) => {
          const href = `${getMyHost(mediaType)}/${countryDatas.Market}/${c.category}`;
          return (
            <BoxList
              key={country + c.label}
              theme='dark'
              label={c.label}
              active={countryDatas.Market === mktType && c.category === category}
              href={href}
            />
          );
        });
        return (
          <ul key={country}>
            <li key={`${country}title`} className='title'>
              {country}
            </li>
            {categories}
          </ul>
        );
      })}
    </Container>
  );
};

export default SitemapSection;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    padding: 20px 0;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    padding: 20px;
  }
  h2 {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
  ul {
    display: flex;
    flex-flow: column wrap;
    min-width: 180px;
    margin: 10px;
    text-align: center;
    @media (max-width: ${StylesVars.spLayoutWidth}px) {
      min-width: 160px;
    }
    @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
      min-width: 180px;
    }
  }
  li {
    margin: 10px;
  }
`;
