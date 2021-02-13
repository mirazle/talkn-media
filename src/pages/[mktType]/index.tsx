import { GetServerSideProps } from 'next';
import TalknMedia from 'pages';
import { ReturnServiceType, UrlParamsType, getServerSidePropsWrap } from 'service';

export default TalknMedia;

export const getServerSideProps: GetServerSideProps<ReturnServiceType, UrlParamsType> = getServerSidePropsWrap;
