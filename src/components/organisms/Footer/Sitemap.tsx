import sitemap from 'json/news/sitemap.json';
import * as React from 'react';
import type { FunctionComponent } from 'react';
import { Category, NewsSitemap } from 'schema/NewsSitemap';
import styled from 'styled-components';

import BoxList from 'components/molecules/BoxList';

type Props = {
  mktType: string;
  category: string;
  redirectTo: (mktType: string, category: string) => Promise<boolean>;
};

const Sitemap: FunctionComponent<Props> = (props: Props) => {
  const { mktType, category, redirectTo } = props;
  const siteMap = sitemap as NewsSitemap[];
  return (
    <Container>
      <h3>- Sitemap -</h3>
      {siteMap.map((countryDatas: NewsSitemap) => {
        const country = countryDatas.Country;
        const categories = countryDatas.Categories.map((c: Category) => (
          <BoxList
            key={country + c.label}
            theme='dark'
            label={c.label}
            active={countryDatas.Market === mktType && c.category === category}
            onClick={() => redirectTo(countryDatas.Market, c.category)}
          />
        ));
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

export default Sitemap;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  h3 {
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
  }
  li {
    margin: 10px;
  }
`;
