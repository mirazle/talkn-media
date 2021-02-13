import dynamic from 'next/dynamic';
import { ComponentType, FunctionComponent, PropsWithChildren } from 'react';

// eslint-disable-next-line react/jsx-no-useless-fragment
const _NoSsr: FunctionComponent = (props: PropsWithChildren<unknown>) => <>{props.children}</>;
const NoSsr: ComponentType = dynamic(() => Promise.resolve(_NoSsr), {
  ssr: false,
});

export default NoSsr;
