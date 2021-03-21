import StylesVars from 'styles/StylesVars';

export const urlToCh = (url: string): string => {
  return url.replace('https:/', '').replace('http:/', '');
};

export const getIsSpLayout = (): boolean => {
  return window.innerWidth < Number(StylesVars.spLayoutWidth);
};

export const getDispFooterScrollY = (): number => {
  const main = document.querySelector('main') as HTMLBodyElement;
  return main.clientHeight + Number(StylesVars.mainLargeFixedMarginTop) - Number(StylesVars.headerHeight);
};

export const getTalknPostTop = (): number => {
  const body = document.querySelector('body') as HTMLBodyElement;
  return body.clientHeight - Number(StylesVars.talknPostHeight);
};

export const gettalknPostScrollY = (isSpLayout: boolean, isFixedSmallNav: boolean, windowInnerHeight?: number): number => {
  let talknPostScrollY = windowInnerHeight ? windowInnerHeight : window.innerHeight;
  if (isSpLayout) {
    talknPostScrollY += Number(StylesVars.mainSmallMarginTop);
  } else {
    talknPostScrollY += isFixedSmallNav ? Number(StylesVars.mainLargeFixedMarginTop) : Number(StylesVars.mainLargeMarginTop);
  }
  return talknPostScrollY;
};

export const getTalknPostFixed = (isSpLayout: boolean, isFixedSmallNav: boolean, windowInnerHeight?: number): boolean => {
  const talknPostScrollY = gettalknPostScrollY(isSpLayout, isFixedSmallNav, windowInnerHeight);
  return talknPostScrollY >= window.scrollY + window.innerHeight;
};

export const updateBaseLayout = (isSpLayout: boolean): void => {
  const html = document.querySelector('html') as HTMLElement;
  const body = document.querySelector('body') as HTMLBodyElement;
  const overflowY = isSpLayout ? 'hidden' : 'scroll';
  const width = isSpLayout ? '100vw' : '100vw';
  const height = isSpLayout ? '100vh' : '100vh';
  html.setAttribute('overflow-y', overflowY);
  html.setAttribute('width', width);
  html.setAttribute('height', height);
  body.setAttribute('overflow-y', overflowY);
  body.setAttribute('width', width);
  body.setAttribute('height', height);
};
