import * as React from 'react';

import { SessionStorageKeys } from 'utils/Constants';

export const onScroll = (scrollName: string, e: React.UIEvent<HTMLUListElement, UIEvent>, onScrollEnd?: () => any): void => {
  const _scrollId = sessionStorage.getItem(`${SessionStorageKeys.scroll}_${scrollName}`);
  let scrollId = (_scrollId as unknown) as NodeJS.Timeout;
  clearTimeout(scrollId);
  scrollId = setTimeout(() => {
    onScrollEnd && onScrollEnd();
    sessionStorage.removeItem(`${SessionStorageKeys.scroll}_${scrollName}`);
  }, 100);
  sessionStorage.setItem(`${SessionStorageKeys.scroll}_${scrollName}`, String(scrollId));
};
