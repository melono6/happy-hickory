import React from "react";
import Grid from "../Grid/Grid";
import styles from "../Heading/Heading.module.scss";
import { styleNames } from "@zepp/utils";

export type HeadingProps = {
  content: {
    title: string;
    headingType: "h1" | "h2";
    isStandalone?: boolean;
    isPrintable?: boolean;
  };
};

export const Heading = ({ content }: HeadingProps) => {
  const {
    title,
    headingType = "h2",
    isStandalone = true,
    isPrintable = false,
  } = {
    ...content,
  };
  const Title = headingType;
  const titleMarginBottom = !isStandalone && "Title--MarginBottom";

  const TitleBase = () => {
    return (
      <Title
        className={styleNames(styles, ["Title", titleMarginBottom])}
        data-printable={isPrintable}
      >
        {title}
      </Title>
    );
  };

  if (!isStandalone) return <TitleBase />;

  return (
    <header className={styles.Wrapper}>
      <Grid row justify="center">
        <Grid column sm={12} md={5}>
          <TitleBase />
        </Grid>
        <Grid column sm={12} md={5} />
      </Grid>
    </header>
  );
};
export default Heading;
