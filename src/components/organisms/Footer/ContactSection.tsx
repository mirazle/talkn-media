import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { ActiveContentState } from 'state';
import styled from 'styled-components';

import NoSsr from 'components/atoms/NoSsr';
import StylesVars from 'styles/StylesVars';
import { mailBackHash } from 'utils/Constants';

type Props = unknown;

const ContactSection: FunctionComponent<Props> = () => {
  const [activeContent] = useRecoilState(ActiveContentState);
  return (
    <Container id='response'>
      <h2>- Contact -</h2>
      <NoSsr>{activeContent.url !== '' && location.hash === mailBackHash && <Thank>Thank You Contact!</Thank>}</NoSsr>
      <FormContent method='POST' action='https://www.talkn.io/mail'>
        <input className='grow' name='inquiry[name]' placeholder='Name' type='text' maxLength={50} size={20} />
        <input className='grow' name='inquiry[mail]' placeholder='Reply Email' maxLength={50} type='text' size={20} />
        <input name='inquiry[title]' placeholder='Title' type='text' maxLength={50} size={20} />
        <textarea name='inquiry[content]' placeholder='Content' maxLength={800} />
        <input type='hidden' value='ja' />
        <input type='submit' value='SEND' />
      </FormContent>
    </Container>
  );
};

export default ContactSection;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  background: rgb(35, 35, 35);
  h2 {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
`;

const FormContent = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 320px;
  input {
    width: 75%;
    height: 30px;
    margin: 5px;
    font-size: 16px;
    text-indent: 10px;
    letter-spacing: 2px;
    user-select: text;
    border: 0;
    border-radius: 0;
    outline: 0;
  }
  input[type='submit'] {
    height: 50px;
    margin: 30px auto;
    color: rgb(221, 221, 221);
    cursor: pointer;
    user-select: none;
    background: rgb(68, 68, 68);
    border-radius: 30px;
    transition: ${StylesVars.transitionDuration};
  }
  input[type='submit']:hover {
    color: rgb(68, 68, 68);
    background: rgb(221, 221, 221);
  }
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px 0;
    margin: 5px;
    font-size: 16px;
    text-indent: 10px;
    letter-spacing: 2px;
    user-select: text;
    border: 0;
    border-radius: 0;
    outline: 0;
  }
  input::placeholder,
  textarea::placeholder {
    font-size: 16px;
    line-height: 16px;
    color: rgb(180, 180, 180);
    text-indent: 10px;
    letter-spacing: 2px;
  }
`;

const Thank = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
`;
