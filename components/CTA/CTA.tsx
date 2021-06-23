import React from "react";
import Link from "next/link";
import styles from "./CTA.module.scss";
import { styleNames } from "@zepp/utils";
import ExternalLinkIcon from "../../public/image/svg/external-link-icon.svg";

export type CTAProps = {
  text: string;
  href: string;
  theme?: "Primary" | "Secondary" | string[];
  type?: "CTA" | "submit" | "reset";
  target?: "_blank" | "_self";
};

const PrimaryDots = () => (
  <span className={styles.ButtonStyleOne}>
    <span className={styles.DotsWrapper}>
      <span className={styles.Dot} />
      <span className={styles.Dot} />
      <span className={styles.Dot} />
      <span className={styles.Dot} />
      <span className={styles.Dot} />
    </span>
  </span>
);

export const CTA = ({ text, href, theme, type = "CTA", target }: CTAProps) => {
  const isPrimary = theme === "Primary";
  const isExernal = target === "_blank";
  return (
    <Link href={href} passHref>
      <a
        className={styleNames(styles, ["CTA", theme])}
        type={type}
        target={target}
      >
        {isPrimary && <PrimaryDots />}
        <span className={styles.CTAText}>{text}</span>
        {isExernal && (
          <span className={styles.ExternalLinkIcon}>
            <ExternalLinkIcon />
          </span>
        )}
      </a>
    </Link>
  );
};

export default CTA;
