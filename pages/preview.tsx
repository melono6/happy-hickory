import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { contentfulService } from "@zepp/utils";
import Components from "../components/__Components__/Components";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Layout from "../components/Layout/Layout";

if (typeof window !== "undefined") {
  const uatEnvironment =
    window.location.hostname === "play-included.netlify.app" && "master";
  contentfulService.init({
    space: process.env.CONTENTFUL_SPACE_ID || "o4zmf232ynmm",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "YI4lGiFRIKpoDVW8XA74QICFSiWdqd1wySKmqyw1W_Y",
    previewToken: "BBe6cLMUMg7LxNqV4Qv4KVd7NP0TxYgLlEjaxqheYuY",
    environment: uatEnvironment || "master",
  });
}

type state = {
  globalContent: any;
  pageContent: any;
};

export default function Preview() {
  const router = useRouter();

  const [state, setState]: [state, Function] = useState({
    globalContent: null,
    pageContent: null,
  });

  useEffect(() => {
    const { contentType, slug } = router.query;
    if (contentType && slug) {
      contentfulService
        .getStaticPreviewProps(slug, contentType, [
          "siteHeader",
          "footer",
          "cookieBanner",
        ])
        .then((props: any) => {
          setState(props);
        });
    }
  }, [router]);

  const { heroPageIntroduction = null } = { ...state.pageContent };
  const { contentType } = router.query;

  console.log(state)
  return (
    <>
      {state.globalContent && (
        <Layout
          globalContent={state.globalContent}
          pageMeta={state.pageContent.metadata?.fields}
          slug={state.pageContent.slug}
        >
          {heroPageIntroduction && contentType == "landingPage" && (
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
          {state.pageContent && Components(state.pageContent)}
        </Layout>
      )}
    </>
  );
}
