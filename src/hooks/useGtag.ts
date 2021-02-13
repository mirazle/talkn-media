import { useRouter } from 'next/router';
import { useEffect } from 'react';

import * as gtag from 'utils/gtag';

/**
 * send client side page view events to gtag
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications?hl=ja
 */
const useGtag = (): void => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default useGtag;
