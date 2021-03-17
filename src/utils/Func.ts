import StylesVars from 'styles/StylesVars';

export const urlToCh = (url: string): string => {
  return url.replace('https:/', '').replace('http:/', '');
};

export const getIsSpLayout = (): boolean => {
  return window.innerWidth < Number(StylesVars.spLayoutWidth);
};

export const updateBaseLayout = (isSpLayout: boolean): void => {
  const html = document.querySelector('html') as HTMLElement;
  const body = document.querySelector('body') as HTMLBodyElement;
  const overflowY = isSpLayout ? 'hidden' : 'scroll';
  const width = isSpLayout ? '100vw' : '100%';
  const height = isSpLayout ? '100vh' : '100%';
  html.setAttribute('overflow-y', overflowY);
  html.setAttribute('width', width);
  html.setAttribute('height', height);
  body.setAttribute('overflow-y', overflowY);
  body.setAttribute('width', width);
  body.setAttribute('height', height);
};
