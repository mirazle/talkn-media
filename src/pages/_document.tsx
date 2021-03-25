/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { talknLiveMediaHost } from 'utils/Networks';
import { GA_TRACKING_ID } from 'utils/gtag';
import { GTM_CONTAINER_ID } from 'utils/gtm';

/**
 * @see https://nextjs.org/docs/advanced-features/custom-document
 */
class CustomDocument extends Document {
  /**
   * @see https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    // const { lang } = Geolite.getLangMap(ctx.req?.headers['accept-language']);
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        {/* NOTE: cannot write prefix in next/head */}
        <Head prefix='og: http://ogp.me/ns#'>
          {this.ServiceWorker}
          {this.TalknExtScripts}
          {this.GoogleSearchConsoleAuth}
          {this.BrowserSelector}
          {/*
          <script data-ad-client='' async src='' />

          {this.ResourceHints}
          {this.GtmForHead}
          {this.GaTrackingForFirstLoad}
        */}
        </Head>
        <body>
          {/*this.GtmForBody*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  private ServiceWorker = (<script type='text/javascript' src='/service.worker.js' />);

  private TalknExtScripts = (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <script async type='text/javascript' data-mode={'LiveMedia'} src={`https://ext.${talknLiveMediaHost}`} />
  );

  private GoogleSearchConsoleAuth = (
    <meta name='google-site-verification' content='rZgLwjp-qaDOhUxA6DxhTYlG-MyBNJVs2cReZJaIxCk' />
  );

  /**
   * NOTE: google tag manager経由で設定されたスクリプトがアクセスしているものが一部ある。利用しなくなったドメインは適宜外していい
   */
  private ResourceHints = (
    <>
      <meta httpEquiv='x-dns-prefetch-control' content='on' />
      <link rel='preconnect dns-prefetch' href='https://www.google-analytics.com' />
      <link rel='preconnect dns-prefetch' href='https://www.googletagmanager.com' />
      <link rel='preconnect dns-prefetch' href='https://www.googleadservices.com' />
      <link rel='preconnect dns-prefetch' href='https://googleads.g.doubleclick.net' />
      <link rel='preconnect dns-prefetch' href='https://bid.g.doubleclick.net' />
      <link rel='preconnect dns-prefetch' href='https://www.google.com' />
      <link rel='preconnect dns-prefetch' href='https://www.google.co.jp' />
      <link rel='preconnect dns-prefetch' href='https://bs.nakanohito.jp' />
      <link rel='preconnect dns-prefetch' href='https://cs.nakanohito.jp' />
    </>
  );

  private GaTrackingForFirstLoad = (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );

  private GtmForHead = (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
`,
      }}
    />
  );

  private BrowserSelector = (
    <script
      dangerouslySetInnerHTML={{
        __html: `
document.documentElement.setAttribute("data-browser", navigator.userAgent);
`,
      }}
    />
  );

  private GtmForBody = (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
`,
      }}
    />
  );
}

export default CustomDocument;
