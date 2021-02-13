import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

type Props = {
  children: React.ReactNode;
};

const PostList: FunctionComponent<Props> = (props: Props) => {
  return (
    <Container>
      <PostIcon />
      <Post>{props.children}</Post>
    </Container>
  );
};

export default PostList;

const Container = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  transition: ${StylesVars.transitionDuration};
  &:hover {
    transform: scale(1.05);
  }
`;

const PostIcon = styled.div`
  width: 20%;
  min-width: 20%;
  height: 60px;
  margin: 0;
  background-image: url(https://assets.talkn.io/icon/https:__assets.talkn.io_favicon.ico.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 30px;
`;

const Post = styled.div`
  flex: 1;
  padding: 19px;
  margin: 20px 20px 20px 0;
  color: #fff;
  word-break: break-all;
  background: rgba(79, 174, 159, 0.9);
  border-radius: 7px;
`;
