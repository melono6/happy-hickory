import React from "react";
import { styleNames } from "@zepp/utils";
import Components from "../__Components__/Components";
import Introduction from "../Introduction/Introduction";
import HeroBanner from "../HeroBanner/HeroBanner";
import styles from "../Content/Content.module.scss";

type PageProps = {
  body?: any;
  pageIntroduction?: any;
  heroPageIntroduction?: any;
};

export const Page = (props: { content: PageProps }) => {
  const { content } = props;
  const { heroPageIntroduction, body } = { ...content };
  const isPageIntrodutionFirst =
    heroPageIntroduction?.[0].sys.contentType.sys.id === "pageIntroduction";
  const headerMargin = isPageIntrodutionFirst && "Header__MarginTop";

  return (
    <main>
      {heroPageIntroduction && (
        <header className={styleNames(styles, ["Header", headerMargin])}>
          {heroPageIntroduction.map((component: any, index: number) => {
            const isHeroBanner =
              component.sys.contentType.sys.id === "heroBanner";
            const isPageIntroduction =
              component.sys.contentType.sys.id === "pageIntroduction";
            if (isHeroBanner) {
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
            }
            if (isPageIntroduction) {
              const { fields } = component;
              return <Introduction content={fields} key={index} />;
            }
          })}
        </header>
      )}
      {body?.map((block: any) => {
        const component = {
          component: block.sys.contentType.sys.id,
          uid: block.sys.id,
          ...block.fields,
        };
        return Components(component, block.fields);
      })}
    </main>
  );
};
export default Page;
