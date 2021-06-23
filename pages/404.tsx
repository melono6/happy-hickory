import React from "react";
import Link from "next/link";
import SiteHeader from "@components/SiteHeader/SiteHeader";
import Components from "../components/__Components__/Components";
import Layout from "../components/Layout/Layout";
import Footer from "@components/Footer/Footer";

import { contentfulService } from "@zepp/utils";

contentfulService.init({
  space: process.env.CONTENTFUL_SPACE_ID || "o4zmf232ynmm",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "YI4lGiFRIKpoDVW8XA74QICFSiWdqd1wySKmqyw1W_Y",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});


export default function FourOhFour({ globalContent, pageContent }) {
  console.log(pageContent);
  return (
    <Layout
      globalContent={globalContent}
      pageMeta={pageContent.metadata?.fields}
      slug={pageContent.slug}
    >
      {Components(pageContent)}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const props = await contentfulService.getStaticProps(
    "404",
    ["content", "formPage", "landingPage"],
    ["siteHeader", "footer", "cookieBanner"]
  );

  return {
    props,
  };
}
