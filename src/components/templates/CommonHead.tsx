import { NextSeo, NextSeoProps } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { HeadTitles, Platforms } from 'utils/Meta';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

type Props = {
  title: string;
  description: string;
  type?: 'website' | 'article';
  thumbnailUrl?: string;
  ogThumbnailUrl?: string;
  sitename?: string;
  seoParameter?: {
    nofollow: boolean;
    noindex: boolean;
  };
};

const CommonHead: FunctionComponent<Props> = ({
  title,
  description,
  type = 'website',
  thumbnailUrl,
  ogThumbnailUrl,
  children,
  sitename,
  seoParameter,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const canonicalUrl = `${baseUrl}${router.pathname}`;
  const nextSeoProps: NextSeoProps = {
    title,
    titleTemplate: '%s',
    description,
    // @see https://en.wikipedia.org/wiki/Canonical_link_element
    canonical: canonicalUrl,
    nofollow: seoParameter?.nofollow,
    noindex: seoParameter?.noindex,
    openGraph: {
      // make this canonical. @see https://developers.facebook.com/docs/sharing/webmasters/?locale=ja_JP#basic
      url: canonicalUrl,
      title,
      description,
      type,
      site_name: sitename || HeadTitles.default,
      images: ogThumbnailUrl
        ? [
            {
              url: ogThumbnailUrl,
            },
          ]
        : undefined,
    },
    facebook: {
      appId: Platforms.facebook.id,
    },
    twitter: {
      handle: '@',
      site: '@',
      cardType: 'summary_large_image',
    },
  };
  return (
    <>
      <NextSeo {...nextSeoProps} />
      {/* NOTE: head tag prefix is written in _document.tsx */}
      {/* NOTE: Another Head for additional tags of React Elements from parsed raw html. NextSeo does not render children. */}
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {thumbnailUrl && <meta name='thumbnail' content={thumbnailUrl} />}
        <link rel='icon' href='/favicon.ico'></link>
        <link rel='apple-touch-icon' href='/apple-touch-icon-144x144.png' />
        {children}
      </Head>
    </>
  );
};

export default CommonHead;
