import React from "react";
import { styleNames, useDevice } from "@zepp/utils";
import Grid from "../Grid/Grid";
import CTA from "../CTA/CTA";
import Image from "../Image/Image";
import styles from "./PagePromo.module.scss";

type PagePromoProps = {
  pagePromoWrapper: PanelItemProps[];
};

type PanelItemProps = {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    categoryShortTitle: string;
    image: {
      fields: {
        title: string;
        file: {
          url: string;
        };
      };
    };
    backgroundColour?: "Peach" | "Blue" | "Red" | "Green";
    ctas?: CTAProps[];
  };
};

type PagePromoPanelProps = {
  title?: string;
  categoryShortTitle?: any;
  image?: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  backgroundColour?: "Peach" | "Blue" | "Red" | "Green";
  ctas?: CTAProps[];
};

type CTAProps = {
  fields: {
    text: string;
    href: string;
    theme?: "Primary" | "Secondary" | string[];
    type?: "CTA" | "submit" | "reset";
    target?: "_blank" | "_self";
    linkType: "Internal link" | "External link" | "Media attachment";
    ctaText?: string;
    ctaLink?: {
      fields: {
        slug: string;
      };
    };
    externalLink?: string;
    mediaLink?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
  sys: {
    id: string;
  };
};

export const PagePromo = (props: { content: PagePromoProps }) => {
  const { content } = props;
  const { pagePromoWrapper } = content;
  const promo1HasImage = pagePromoWrapper[0].fields.image !== undefined;
  const promo2HasImage = pagePromoWrapper[1]?.fields?.image !== undefined;

  const device = useDevice();
  const isMobile = device === "mobile" || device === "tablet";

  // Promo 1
  const { fields: page_promo_1_fields } = pagePromoWrapper[0];
  const {
    title: page_promo_1_title,
    categoryShortTitle: page_promo_1_category_short_title,
    image: page_promo_1_image,
    backgroundColour: page_promo_1_background_colour,
    ctas: page_promo_1_cta,
  } = page_promo_1_fields;

  // Promo 2
  const { fields: page_promo_2_fields } = { ...pagePromoWrapper[1] };
  const {
    title: page_promo_2_title,
    categoryShortTitle: page_promo_2_category_short_title,
    image: page_promo_2_image,
    backgroundColour: page_promo_2_background_colour,
    ctas: page_promo_2_cta,
  } = { ...page_promo_2_fields };

  return (
    <section className={styles.Wrapper}>
      <Grid row>
        {isMobile ? (
          <>
            {promo1HasImage && promo2HasImage && (
              <>
                <PagePromoPanel image={page_promo_1_image} />
                <PagePromoPanel image={page_promo_2_image} />
              </>
            )}
            {promo1HasImage && !promo2HasImage && (
              <>
                <PagePromoPanel image={page_promo_1_image} />
                <PagePromoPanel
                  title={page_promo_2_title}
                  categoryShortTitle={page_promo_2_category_short_title}
                  backgroundColour={page_promo_2_background_colour}
                  ctas={page_promo_2_cta}
                />
              </>
            )}
            {promo2HasImage && !promo1HasImage && (
              <>
                <PagePromoPanel image={page_promo_2_image} />
                <PagePromoPanel
                  title={page_promo_1_title}
                  categoryShortTitle={page_promo_1_category_short_title}
                  backgroundColour={page_promo_1_background_colour}
                  ctas={page_promo_1_cta}
                />
              </>
            )}
            {!promo1HasImage && !promo2HasImage && (
              <>
                <PagePromoPanel
                  title={page_promo_1_title}
                  categoryShortTitle={page_promo_1_category_short_title}
                  backgroundColour={page_promo_1_background_colour}
                  ctas={page_promo_1_cta}
                />
                <PagePromoPanel
                  title={page_promo_2_title}
                  categoryShortTitle={page_promo_2_category_short_title}
                  backgroundColour={page_promo_2_background_colour}
                  ctas={page_promo_2_cta}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PagePromoPanel
              title={page_promo_1_title}
              categoryShortTitle={page_promo_1_category_short_title}
              image={page_promo_1_image}
              backgroundColour={page_promo_1_background_colour}
              ctas={page_promo_1_cta}
            />
            <PagePromoPanel
              title={page_promo_2_title}
              categoryShortTitle={page_promo_2_category_short_title}
              image={page_promo_2_image}
              backgroundColour={page_promo_2_background_colour}
              ctas={page_promo_2_cta}
            />
          </>
        )}
      </Grid>
    </section>
  );
};

const PagePromoPanel = ({
  title,
  image,
  backgroundColour,
  categoryShortTitle,
  ctas,
}: PagePromoPanelProps) => {
  const { fields: image_fields } = { ...image };
  const { title: image_title = "", file } = { ...image_fields };
  const { url = "" } = { ...file };
  const device = useDevice();
  const isMobile = device === "mobile";
  const panelBackgroundColour = `PanelWrapper--${backgroundColour}`;

  return (
    <Grid column lg={6} sm={12}>
      <div
        className={styleNames(styles, ["PanelWrapper", panelBackgroundColour])}
      >
        {image_fields && (
          <div className={styles.ImageWrapper}>
            <Image
              src={url}
              alt={image_title}
              width={isMobile ? 375 : 596}
              height={isMobile ? 264 : 424}
              isSmartCrop={isMobile ? true : false}
              isCrop={isMobile ? false : true}
            />
          </div>
        )}
        {((title && !image_fields) ||
          (categoryShortTitle && !image_fields) ||
          (ctas && !image_fields)) && (
          <div className={styles.CopyAligner}>
            <div className={styles.CopyWrapper}>
              {categoryShortTitle && (
                <h2 className={styles.Category}>{categoryShortTitle}</h2>
              )}
              {title && <h3 className={styles.Title}>{title}</h3>}
              {ctas?.map((ctaItem: CTAProps) => {
                const { fields: cta_fields, sys } = ctaItem;
                const {
                  linkType,
                  ctaText = "",
                  ctaLink = {
                    fields: {
                      slug: "",
                    },
                  },
                  externalLink = "",
                  mediaLink = {
                    fields: {
                      file: {
                        url: "",
                      },
                    },
                  },
                } = {
                  ...cta_fields,
                };
                const { id } = sys;
                const isInternalLink = linkType === "Internal link";

                let cta_slug: string;
                switch (linkType) {
                  case "External link":
                    cta_slug = `${externalLink}`;
                    break;
                  case "Media attachment":
                    cta_slug = `/${mediaLink?.fields?.file?.url}`;
                    break;
                  default:
                    cta_slug = `/${ctaLink?.fields?.slug}`;
                }
                return (
                  <div className={styles.CTAWrapper} key={id}>
                    <CTA
                      href={cta_slug}
                      text={ctaText}
                      theme="Primary"
                      target={isInternalLink ? "_self" : "_blank"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
};
export default PagePromo;
