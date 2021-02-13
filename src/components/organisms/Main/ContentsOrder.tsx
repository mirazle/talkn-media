import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType, ContentsValuesType } from 'schema';
import { UrlState } from 'state';
import styled from 'styled-components';

import ContentsList from 'components/molecules/ContentsList';
import StylesVars from 'styles/StylesVars';

type Props = {
  contents: ContentsValuesType;
  handleOnClickContents: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
};

const ContentsOrder: FunctionComponent<Props> = (props: Props) => {
  const [url] = useRecoilState(UrlState);
  const { contents, handleOnClickContents } = props;
  return (
    <Container url={url}>
      {Array.from(contents).map((content: ContentsValueType, index: number) => (
        <ContentsList
          key={`${content.url}_${index}`}
          name={content.name}
          url={content.url}
          imageUrl={content.image?.thumbnail.contentUrl}
          datePublished={content.datePublished}
          active={content.url === url}
          onClick={(e) => handleOnClickContents(e, index)}
        />
      ))}
    </Container>
  );
};

export default ContentsOrder;

type RankSectionPropsType = {
  url: string;
};

const Container = styled.ol<RankSectionPropsType>`
  height: 800px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #ddd;
  scroll-snap-align: center;
  @media (max-width: ${StylesVars.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    width: 50%;
  }
`;
