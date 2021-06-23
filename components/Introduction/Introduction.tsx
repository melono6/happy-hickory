import React from "react";
import { useDevice } from "@zepp/utils";
import Grid from "../Grid/Grid";
import Heading from "../Heading/Heading";
import styles from "../Introduction/Introduction.module.scss";

export type IntroductionProps = {
  content: {
    title?: string;
    subheading?: string;
    copy?: string;
    component?: "sectionIntroduction";
    isPrintable?: boolean;
  };
};

export const Introduction = ({ content }: IntroductionProps) => {
  const { title, subheading, copy, component, isPrintable } = { ...content };
  const isSectionHeading = component && component === "sectionIntroduction";
  const headingType = isSectionHeading ? "h2" : "h1";
  const device = useDevice();
  const isMobile = device === "mobile";
  return (
    <section className={styles.Wrapper} data-printable={isPrintable}>
      <Grid row>
        {!isMobile && <Grid column md={1} />}
        <Grid column sm={12} md={8}>
          <div className={styles.CopyWrapper}>
            {title && (
              <Heading content={{ headingType, title, isStandalone: false }} />
            )}
            {subheading && <h3 className={styles.Subheading}>{subheading}</h3>}
            {copy && <p className={styles.Copy}>{copy}</p>}
          </div>
        </Grid>
        {!isMobile && <Grid column md={3} />}
      </Grid>
    </section>
  );
};
export default Introduction;
