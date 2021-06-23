import React from "react";
import Ratio from "react-ratio";
import { styleNames, useDevice } from "@zepp/utils";
import styles from "../Image/Image.module.scss";

export type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  desktopWidth?: number;
  desktopHeight?: number;
  isCrop?: boolean;
  isSmartCrop?: boolean;
  cropFocus?:
    | "center"
    | "top"
    | "right"
    | "left"
    | "bottom"
    | "top_right"
    | "top_left"
    | "bottom_right"
    | "bottom_left"
    | "faces";
  eager?: boolean;
};

export const Image = ({
  src,
  alt,
  width,
  height,
  desktopWidth,
  desktopHeight,
  isCrop,
  isSmartCrop,
  cropFocus,
  eager,
}: ImageProps) => {
  const srcWithParams = (device = "mobile", format = "webp") => {
    let modifiedSrc = `${src}?`;

    // Image extension type
    modifiedSrc = `${modifiedSrc}&fm=${format}`;

    if (device === "desktop" && desktopWidth) {
      modifiedSrc = `${modifiedSrc}&w=${desktopWidth?.toString()}`;
    } else {
      modifiedSrc = `${modifiedSrc}&w=${width.toString()}`;
    }

    if (device === "desktop" && desktopHeight) {
      modifiedSrc = `${modifiedSrc}&h=${desktopHeight?.toString()}`;
    } else {
      modifiedSrc = `${modifiedSrc}&h=${height.toString()}`;
    }

    // Crops to image dimensions
    if (isCrop) {
      modifiedSrc = `${modifiedSrc}&fit=fill`;
    } else if (isSmartCrop) {
      // and focuses on faces
      modifiedSrc = `${modifiedSrc}&fit=fill&f=faces`;
    } else if (cropFocus) {
      // or focuses on selected option
      modifiedSrc = `${modifiedSrc}&fit=fill&f=${cropFocus}`;
    }

    return modifiedSrc;
  };

  const ratioCalculator = (width: number, height: number) => {
    const aspectRatio = width / height;
    const widthT = height * aspectRatio;
    const heightT = width / aspectRatio;
    return widthT / heightT;
  };

  const ratio = ratioCalculator(width, height);
  const ratioDesktop = ratioCalculator(
    desktopWidth || width,
    desktopHeight || height
  );

  const srcParamsDefault = srcWithParams();
  const srcParamsJpeg = srcWithParams("mobile", "jpg");
  const srcParamsPng = srcWithParams("desktop", "png");

  const device = useDevice();
  const isMobile = device === "mobile";

  const imageWidth = desktopWidth && !isMobile ? desktopWidth : width;
  const imageHeight = desktopHeight && !isMobile ? desktopHeight : height;

  return (
    <Ratio className={styles.Ratio} ratio={isMobile ? ratio : ratioDesktop}>
      <picture className={styleNames(styles, ["Wrapper"])}>
        {(desktopWidth || desktopHeight) && (
          <>
            <source
              srcSet={srcWithParams("desktop")}
              type="image/webp"
              media="(min-width: 767px)"
            />
            <source
              srcSet={srcParamsPng}
              type="image/png"
              media="(min-width: 767px)"
            />
            <source
              srcSet={srcParamsJpeg}
              type="image/jpeg"
              media="(min-width: 767px)"
            />
          </>
        )}
        <source srcSet={srcParamsDefault} type="image/webp" />
        <source srcSet={srcParamsPng} type="image/png" />
        <source srcSet={srcParamsJpeg} type="image/jpeg" />

        <img
          className={styleNames(styles, ["Image"])}
          src={srcParamsDefault}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading={eager ? "eager" : "lazy"}
        />
      </picture>
    </Ratio>
  );
};
export default Image;
