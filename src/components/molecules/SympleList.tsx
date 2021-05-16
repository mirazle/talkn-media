import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import StylesVars from 'styles/StylesVars';

const ThemeGreen = 'green';
const ThemeDark = 'dark';
type ThemeTypes = typeof ThemeGreen | typeof ThemeDark;
type Props = {
  label: string;
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  href?: string;
  theme?: ThemeTypes;
};

const Labels: FunctionComponent<{ label: string }> = (props) => {
  return <label>{props.label}</label>;
};

const Button: FunctionComponent<Props> = (props) => {
  return (
    <button onClick={(e) => props.onClick && props.onClick(e)}>
      <Labels label={props.label} />
    </button>
  );
};

const Anchor: FunctionComponent<Props> = (props) => {
  return (
    <a href={props.href}>
      <Labels label={props.label} />
    </a>
  );
};

const Content: FunctionComponent<Props> = (props) => {
  return props.href ? <Anchor {...props} /> : <Button {...props} />;
};

const SympleList: FunctionComponent<Props> = (props) => {
  const addClassName = props.className ? props.className : '';
  const className = props.active ? `${addClassName} active` : addClassName;
  return (
    <Container key={props.label} theme={props.theme} className={className}>
      <Content {...props} />
    </Container>
  );
};

export default SympleList;

SympleList.defaultProps = {
  theme: ThemeGreen,
};

type ContainerPropType = {
  theme: ThemeTypes;
};

const Container = styled.li<ContainerPropType>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: auto;
  height: ${Number(StylesVars.baseHeight)}px;
  button {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')};
    text-indent: 30px;
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
    border: 0;
    outline: 0;
    transition: ${StylesVars.transitionDuration};
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')};
    text-indent: 30px;
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
  }
  a:hover,
  button:hover {
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(245, 245, 245, 1)' : 'rgba(98, 98, 98, 1)')};
  }
  label {
    position: relative;
    cursor: pointer;
  }
`;
