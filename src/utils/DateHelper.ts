import dayjs from 'dayjs';

export const getProgressTime = (time: Date): string => {
  const minuteSecond = 60 * 1000;
  const hourSecond = 3600 * 1000;
  const daySecond = 3600 * 24 * 1000;
  const dNow = dayjs().locale('en');
  const dPast = dayjs(time).locale('en');
  const diffSeond = dNow.diff(dPast);
  let returnNum = 0;
  let returnTimeUnit = '';

  if (diffSeond < minuteSecond) {
    returnTimeUnit = 'sec';
    returnNum = dNow.diff(dPast, 'second');
  } else if (diffSeond < hourSecond) {
    returnTimeUnit = 'min';
    returnNum = dNow.diff(dPast, 'minute');
  } else if (diffSeond < daySecond) {
    returnTimeUnit = 'hour';
    returnNum = dNow.diff(dPast, 'hour');
  } else {
    returnTimeUnit = 'day';
    returnNum = dNow.diff(dPast, 'day');
  }
  return `${returnNum} ${returnTimeUnit} ago`;
};
