import React from "react";
import Head from "next/head";
import SiteHeader from "@components/SiteHeader/SiteHeader";
import Footer from "@components/Footer/Footer";
import CookieBanner from "@components/CookieBanner/CookieBanner";
import HoldingPage from "@components/HoldingPage/HoldingPage";

type LayoutProps = {
  globalContent?: any;
  slug: string;
  pageMeta?: {
    title: string;
    description?: string;
    author?: string;
    image?: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
  };
  children: any;
  initialLoggedIn?: boolean;
  title?: string;
};

export const Layout = ({
  globalContent,
  slug,
  pageMeta,
  children,
}: LayoutProps) => {
  const environment = process.env.NODE_ENV;
  const gtmTag = process.env.NEXT_PUBLIC_GTM_ID;
  const { siteHeader } = globalContent;
  const { metadata, showHoldingPage, holdingPageTitle } = siteHeader;
  const { fields: metadata_fields } = metadata;
  const metadataObj = {
    title: pageMeta
      ? `${pageMeta.title} | ${metadata_fields.title}`
      : metadata_fields.title,
    description: pageMeta ? pageMeta.description : metadata_fields.description,
    author: pageMeta ? pageMeta.author : metadata_fields.author,
    imageUrl: pageMeta
      ? pageMeta.image?.fields.file.url
      : metadata_fields.image?.fields.file.url,
    imageAlt: pageMeta
      ? pageMeta.image?.fields.title
      : metadata_fields.image?.fields.title,
  };

  return (
    <>
      <Head>
        <title>{metadataObj.title}</title>
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#ff351f"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={slug} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {metadataObj.description && (
          <meta name="description" content={metadataObj.description} />
        )}
        {metadataObj.author && (
          <meta name="author" content={metadataObj.author} />
        )}
        <meta property="og:title" content={metadataObj.title} />
        {metadataObj.description && (
          <meta property="og:description" content={metadataObj.description} />
        )}
        {metadataObj.imageUrl && (
          <meta property="og:image" content={metadataObj.imageUrl} />
        )}
        <meta property="og:url" content={slug} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={metadataObj.title} />
        {metadataObj.imageAlt && (
          <meta name="twitter:image:alt" content={metadataObj.imageAlt} />
        )}
        {gtmTag && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
          {'gtm.start': new Date().getTime(),event:'gtm.js'}
          );var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmTag}');`,
            }}
          />
        )}
      </Head>
      {showHoldingPage ? (
        <>{holdingPageTitle && <HoldingPage title={holdingPageTitle} />}</>
      ) : (
        <>
          {globalContent.siteHeader && (
            <SiteHeader content={globalContent.siteHeader} />
          )}
          {children}
          {globalContent?.footer && <Footer content={globalContent.footer} />}
          {globalContent?.cookieBanner && (
            <CookieBanner content={globalContent.cookieBanner} />
          )}
        </>
      )}
    </>
  );
};
export default Layout;
