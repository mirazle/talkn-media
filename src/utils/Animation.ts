const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export const scrollLeftAnimation = (
  elm: HTMLElement,
  to: number,
  dispath?: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const duration = 300;
  const start = 0;
  let currentTime = 0;
  const increment = 20;
  const animateScroll = () => {
    currentTime += increment;
    const scrollLeft = easeInOutQuad(currentTime, start, to, duration);
    elm.scrollLeft = scrollLeft;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      dispath && dispath(true);
    }
  };
  dispath && dispath(false);
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
