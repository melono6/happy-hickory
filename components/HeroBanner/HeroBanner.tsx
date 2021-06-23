import React from "react";
import { styleNames, useDevice } from "@zepp/utils";
import CTA from "../CTA/CTA";
import Grid from "../Grid/Grid";
import Image from "../Image/Image";
import styles from "./HeroBanner.module.scss";
import Bricks6 from "../../public/image/svg/Bricks6.svg";
import Bricks8 from "../../public/image/svg/Bricks8.svg";

export type HeroBannerProps = {
  title?: string;
  copy?: any;
  image: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  imageOverlayPosition?: "Left" | "Right";
  imageOverlayColour: "none" | "Red" | "Green" | "Blue" | "Peach";
  imageOverlayType: "Brick pattern 1" | "Brick pattern 2";
  componentAlignment:
    | "Image left, text right"
    | "Text left, image right"
    | "Full width image";
  cta: {
    fields: {
      ctaText: string;
      linkType: string;
      ctaLink: {
        fields: {
          slug: string;
          title: string;
        };
      };
      externalLink: string;
      mediaLink: {
        fields: {
          file: {
            url: string;
          };
          title: string;
        };
      };
    };
  };
};

export const HeroBanner = ({
  title,
  copy,
  image,
  imageOverlayPosition,
  imageOverlayColour,
  imageOverlayType,
  componentAlignment,
  cta,
}: HeroBannerProps) => {
  const { fields: image_fields } = { ...image };
  const { title: image_title, file } = { ...image_fields };
  const { url } = { ...file };
  const { fields: cta_fields } = { ...cta };
  const { linkType, ctaText, ctaLink, externalLink, mediaLink } = {
    ...cta_fields,
  };
  const isInternalLink = linkType === "Internal link";

  let cta_slug: string | null;
  switch (linkType) {
    case "Internal link":
      cta_slug = ctaLink?.fields?.slug;
      break;
    case "External link":
      cta_slug = externalLink;
      break;
    case "Media attachment":
      cta_slug = mediaLink?.fields?.file?.url;
      break;
    default:
      cta_slug = null;
  }

  const textIsRight = componentAlignment === "Image left, text right";
  const textIsLeft = componentAlignment === "Text left, image right";
  const isFullWidth = componentAlignment === "Full width image";

  const brickPatternOverlayPosition = imageOverlayPosition
    ? imageOverlayPosition
    : "Left";
  const overlayPosition = `ImageOverlay--${brickPatternOverlayPosition}`;
  const overlayPositionFullWidth =
    isFullWidth && `ImageOverlay--FullWidth${brickPatternOverlayPosition}`;
  const overlayColour = `ImageOverlay--${imageOverlayColour}`;
  let brickPattern: string | null;
  switch (imageOverlayType) {
    case "Brick pattern 1":
      brickPattern = "Bricks6";
      break;
    case "Brick pattern 2":
      brickPattern = "Bricks8";
      break;
    default:
      brickPattern = "None";
  }
  const overlayType = imageOverlayType && `ImageOverlay--${brickPattern}`;
  const isImageOverlay = overlayType;

  const bricksMap = {
    Bricks6,
    Bricks8,
  };

  const Bricks = bricksMap[brickPattern];

  const device = useDevice();
  const isMobile = device === "mobile" || device === "tablet";

  const Text = () => (
    <Grid column lg={6} sm={12}>
      <div
        className={styleNames(styles, [
          "CopyWrapper",
          textIsRight
            ? "CopyWrapper--PaddingLeft"
            : "CopyWrapper--PaddingRight",
        ])}
      >
        {title && <h1 className={styles.Title}>{title}</h1>}
        {copy && <p className={styles.Copy}>{copy}</p>}
        {cta && cta_slug && (
          <div className={styles.CTAWrapper}>
            <CTA
              href={cta_slug}
              text={ctaText}
              theme="Primary"
              target={isInternalLink ? "_self" : "_blank"}
            />
          </div>
        )}
      </div>
    </Grid>
  );

  if (isFullWidth) {
    return (
      <section
        className={styleNames(styles, ["Wrapper", "Wrapper--FullWidth"])}
      >
        <div className={styles.FullWidthImageWrapper}>
          <Image
            src={url}
            alt={image_title}
            desktopWidth={1440}
            desktopHeight={600}
            width={375}
            height={280}
            isCrop
            eager
          />
          {isImageOverlay && (
            <div className={styles.ImageOverlayGridWrapper}>
              <Grid row>
                <Grid column sm={12}>
                  <div className={styles.ImageOverlayWrapper}>
                    <div
                      className={styleNames(styles, [
                        "ImageOverlay",
                        overlayPosition,
                        overlayColour,
                        overlayType,
                        overlayPositionFullWidth,
                      ])}
                    >
                      {Bricks && <Bricks />}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.Wrapper}>
      <Grid row alignItems="flex-start">
        {textIsLeft && !isMobile && <Text />}
        <Grid column lg={6} sm={12}>
          <div
            className={styleNames(styles, [
              "ImageWrapper",
              textIsRight
                ? "ImageWrapper--LeftOffGrid"
                : "ImageWrapper--RightOffGrid",
            ])}
          >
            <Image
              src={url}
              alt={image_title}
              width={708}
              height={528}
              isCrop
              eager
            />
            {isImageOverlay && (
              <div
                className={styleNames(styles, [
                  "ImageOverlay",
                  overlayPosition,
                  overlayColour,
                  overlayType,
                ])}
              >
                {Bricks && <Bricks />}
              </div>
            )}
          </div>
        </Grid>
        {(textIsRight || isMobile) && <Text />}
      </Grid>
    </section>
  );
};
export default HeroBanner;
