import React from "react";
import Components from "../components/__Components__/Components";
import Layout from "../components/Layout/Layout";
import { contentfulService } from "@zepp/utils";

console.log(process.env);

contentfulService.init({
  space: process.env.CONTENTFUL_SPACE_ID || "o4zmf232ynmm",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "YI4lGiFRIKpoDVW8XA74QICFSiWdqd1wySKmqyw1W_Y",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

export default function Page({ globalContent, pageContent }) {
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const pages = await contentfulService.fetchEntries({
    content_type: "content",
  });
  const forms = await contentfulService.fetchEntries({
    content_type: "formPage",
  });
  const landingPages = await contentfulService.fetchEntries({
    content_type: "landingPage",
  });

  const allPages = pages.concat(forms).concat(landingPages);

  let paths = allPages?.map((page) => {
    const slugArray = page.fields.slug.split("/");
    if (page.fields.slug === '404') {
      return null;
    }
    return { params: { page: slugArray } };
  }).filter(here => here);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const props = await contentfulService.getStaticProps(
    params.page.join("/"),
    ["content", "formPage", "landingPage"],
    ["siteHeader", "footer", "cookieBanner"]
  );

  return {
    props,
  };
}
