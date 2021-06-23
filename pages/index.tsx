import React from "react";
import Components from "../components/__Components__/Components";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout/Layout";
import { contentfulService } from "@zepp/utils";

contentfulService.init({
  space: process.env.CONTENTFUL_SPACE_ID || "o4zmf232ynmm",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "YI4lGiFRIKpoDVW8XA74QICFSiWdqd1wySKmqyw1W_Y",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

export default function Page({ globalContent, pageContent }) {
  const { heroPageIntroduction = null } = { ...pageContent };
  return (
    <>
      <Layout
        globalContent={globalContent}
        pageMeta={pageContent.metadata?.fields}
        slug={pageContent.slug}
      >
        {heroPageIntroduction && (
          <header>
            {heroPageIntroduction.map((component: any, index: number) => {
              const { fields } = component;
              const {
                title = null,
                copy = null,
                image = null,
                imageOverlayPosition = null,
                imageOverlayColour = null,
                imageOverlayType = null,
                componentAlignment = null,
                cta = null,
              } = { ...fields };
              return (
                <HeroBanner
                  title={title}
                  copy={copy}
                  image={image}
                  imageOverlayPosition={imageOverlayPosition}
                  imageOverlayColour={imageOverlayColour}
                  imageOverlayType={imageOverlayType}
                  componentAlignment={componentAlignment}
                  cta={cta}
                  key={index}
                />
              );
            })}
          </header>
        )}
        {Components(pageContent)}
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const props = await contentfulService.getStaticProps("home", "landingPage", [
    "siteHeader",
    "footer",
    "cookieBanner",
  ]);

  return {
    props,
  };
}
