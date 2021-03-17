import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';
import { getProgressTime } from 'utils/DateHelper';

type Props = {
  name: string;
  url: string;
  datePublished: Date;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  imageUrl?: string;
};

const ContentsList: FunctionComponent<Props> = (props) => {
  const { name, url, imageUrl, datePublished, active, onClick } = props;
  const ImageTag = imageUrl ? <Image src={imageUrl} alt={name} /> : <NoImage>NO IMAGE</NoImage>;
  const className = active ? 'active' : '';
  return (
    <Container className={className} onClick={onClick} data-url={url}>
      {ImageTag}
      <Title>{name}</Title>
      <OrderBase>{getProgressTime(datePublished)}</OrderBase>
    </Container>
  );
};

export default ContentsList;

const Container = styled.li`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 60px;
  max-height: 60px;
  cursor: pointer;
  background: rgb(240, 240, 240);
  border-right: 1px solid ${StylesVars.borderColor};
  border-bottom: 1px solid ${StylesVars.borderColor};
  transition: ${StylesVars.transitionDuration};
  &.active {
    background: rgb(255, 255, 255);
    border-right: 1px solid #fff;
  }
  button {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: left;
    background: rgba(255, 255, 255, 0);
    border: 0;
    outline: 0;
  }
  @media (min-width: calc(${StylesVars.spLayoutWidth}px + 1px)) {
    &:hover {
      background: rgb(250, 250, 250);
      border-right: 1px solid #fff;
    }
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
`;

const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  background: rgb(0, 0, 0);
`;

const Title = styled.div`
  display: flex;
  flex: 4;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 48px;
  padding: 5px 10px;
  overflow: hidden;
  line-height: 23px;
`;

const OrderBase = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
