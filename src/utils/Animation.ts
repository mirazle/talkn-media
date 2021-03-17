const easeInOutQuad = (currentTime: number, start: number, end: number, duration: number) => {
  const add = (currentTime: number, start: number, end: number, duration: number) => {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return (end / 2) * currentTime * currentTime + start;
    } else {
      currentTime--;
      return (-end / 2) * (currentTime * (currentTime - 2) - 1) + start;
    }
  };

  const sub = (currentTime: number, start: number, end: number, duration: number) => {
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return start - (start / 2) * currentTime * currentTime + end;
    } else {
      currentTime--;
      return start - (-start / 2) * (currentTime * (currentTime - 2) - 1) + end;
    }
  };
  return start < end ? add(currentTime, start, end, duration) : sub(currentTime, start, end, duration);
};

export const scrollLeftAnimation = (elm: HTMLElement, end: number, startBack?: () => void, endBack?: () => void): void => {
  let currentTime = 0;
  let timeoutId: NodeJS.Timeout;
  const duration = 3000;
  const start = elm.scrollLeft;
  const increment = 20;
  let left = 0;
  const animateScroll = () => {
    currentTime += increment;
    left = easeInOutQuad(currentTime, start, end, duration);
    // console.log('Animation LEFT ' + Math.floor(left));
    elm.scrollLeft = Math.floor(left);
    if (currentTime < duration) {
      timeoutId = setTimeout(animateScroll, increment);
    } else {
      clearTimeout(timeoutId);
      endBack && endBack();
    }
  };
  startBack && startBack();
  animateScroll();
};

export const scrollWindowTopAnimation = (_to: number, dispath?: React.Dispatch<React.SetStateAction<boolean>>): void => {
  const duration = 300;
  const start = window.scrollY;
  let currentTime = 0;
  const increment = 20;
  const to = _to - start;
  const animateScroll = () => {
    currentTime += increment;
    const scrollTop = easeInOutQuad(currentTime, start, to, duration);
    window.scrollTo(0, scrollTop);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      dispath && dispath(true);
    }
  };
  dispath && dispath(false);
  animateScroll();
};
