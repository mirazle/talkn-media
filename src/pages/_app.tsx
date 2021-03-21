import { AppProps } from 'next/app';
import React from 'react';
import type { FunctionComponent } from 'react';
import { RecoilRoot } from 'recoil';

import PageWithLoadingSpinner from 'components/templates/PageWithLoadingSpinner';
// import useGtag from 'hooks/useGtag';
import 'styles/global.scss';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  // useGtag();
  return (
    <RecoilRoot>
      <PageWithLoadingSpinner>
        <Component {...pageProps} />
      </PageWithLoadingSpinner>
    </RecoilRoot>
  );
};

export default App;

// useContext
// export const Context = React.createContext({});
// <Context.Provider value={{ name: 'to-R Media' }}>
// </Context.Provider>
