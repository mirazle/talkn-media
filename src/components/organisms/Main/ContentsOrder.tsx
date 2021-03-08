import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ContentsValueType, ContentsValuesType } from 'schema';
import { ActiveContentState } from 'state';
import styled from 'styled-components';

import ContentsList from 'components/molecules/ContentsList';

type Props = {
  contents: ContentsValuesType;
  handleOnClickContents: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void;
};

const ContentsOrder: FunctionComponent<Props> = (props: Props) => {
  const [activeContent] = useRecoilState(ActiveContentState);
  const { contents, handleOnClickContents } = props;
  return (
    <Container>
      {Array.from(contents).map((content: ContentsValueType, index: number) => (
        <ContentsList
          key={`${content.url}_${index}`}
          name={content.name}
          url={content.url}
          imageUrl={content.image?.thumbnail.contentUrl}
          datePublished={content.datePublished}
          active={content.url === activeContent.url}
          onClick={(e) => handleOnClickContents(e, index)}
        />
      ))}
    </Container>
  );
};

export default ContentsOrder;

const Container = styled.ol`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
