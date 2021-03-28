import Router from 'next/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';
import { LoadingState } from 'state';
import styled from 'styled-components';

import SpinnerIcon from 'components/atoms/Icon/Spinner';
import StylesVars from 'styles/StylesVars';

const spinnerSize = StylesVars.iconBaseSize;

const Component: FunctionComponent<PropsWithChildren<unknown>> = ({ children }) => {
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);
  useEffect(() => {
    const startLoad = () => setIsLoading(true);
    const stopLoad = () => setIsLoading(false);
    Router.events.on('routeChangeStart', startLoad);
    Router.events.on('routeChangeComplete', stopLoad);
    Router.events.on('routeChangeError', stopLoad);
    return () => {
      Router.events.off('routeChangeStart', startLoad);
      Router.events.off('routeChangeComplete', stopLoad);
      Router.events.off('routeChangeError', stopLoad);
    };
  }, [setIsLoading]);
  const router = useRouter();
  return (
    <>
      {(router.isFallback || isLoading) && (
        <Wrapper>
          <SpinnerIcon size={spinnerSize} />
        </Wrapper>
      )}
      {!router.isFallback && children}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: ${StylesVars.loadingAreaZindex};
  width: 100vw;
  height: 100vh;
  > * {
    position: fixed;
    top: calc((100vh - ${spinnerSize}) / 2);
    left: calc((100vw - ${spinnerSize}) / 2);
    z-index: ${StylesVars.loadingAreaZindex};
  }
`;

export default Component;
