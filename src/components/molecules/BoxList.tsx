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
  theme?: ThemeTypes;
};

const BoxList: FunctionComponent<Props> = (props) => {
  const addClassName = props.className ? props.className : '';
  const className = props.active ? `${addClassName} active` : addClassName;
  return (
    <Container key={props.label} theme={props.theme} className={className}>
      <button onClick={(e) => props.onClick && props.onClick(e)}>
        <label>{props.label}</label>
        <div className='lamp'>&nbsp;</div>
      </button>
    </Container>
  );
};

BoxList.defaultProps = {
  active: false,
  theme: ThemeGreen,
};

export default BoxList;

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
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')};
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
    border: 0;
    outline: 0;
    transition: ${StylesVars.transitionDuration};
  }
  button:hover {
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(245, 245, 245, 1)' : 'rgba(98, 98, 98, 1)')};
  }
  .lamp {
    position: relative;
    width: 50%;
    max-width: 50px;
    height: 10px;
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? StylesVars.bgColor : 'rgba(155, 155, 155, 1)')};
    border-radius: 10px;
    transition: ${StylesVars.transitionDuration1};
  }
  label {
    position: relative;
    margin-bottom: 6px;
    cursor: pointer;
  }

  &.active div.lamp {
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(79, 174, 159, 1)' : 'rgba(79, 174, 159, 1)')};
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)')};
    cursor: pointer;
    background: ${(props) => (props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)')};
  }
`;
