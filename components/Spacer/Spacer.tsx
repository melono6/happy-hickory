import React from "react";
import Grid from "../Grid/Grid";
import { styleNames } from "@zepp/utils";
import styles from "./Spacer.module.scss";
import Bricks4 from "../../public/image/svg/Bricks4.svg";
import Bricks6 from "../../public/image/svg/Bricks6.svg";
import Dots1 from "../../public/image/svg/Dots1.svg";
import Dots2 from "../../public/image/svg/Dots2.svg";
import Dots3 from "../../public/image/svg/Dots3.svg";
import Dots4 from "../../public/image/svg/Dots4.svg";

export type SpacerProps = {
  imageColour: string;
  imagePosition: string;
  imageType: string;
};

export const Spacer = (props: { content: SpacerProps }) => {
  const { content } = props;
  const { imageColour, imagePosition, imageType } = content;

  const isBrick4 = imageType === "Bricks4";
  const isBrick6 = imageType === "Bricks6";
  const isDots1 = imageType === "Dots1";
  const isDots2 = imageType === "Dots2";
  const isDots3 = imageType === "Dots3";
  const isDots4 = imageType === "Dots4";

  const spacerPosition = `Spacer--${imagePosition}`;
  const spacerColour = `Spacer--${imageColour}`;
  const spacerType = `Spacer--${imageType}`;

  return (
    <section className={styles.Wrapper}>
      <Grid row justify="center">
        <Grid column sm={12} md={10}>
          <div
            className={styleNames(styles, [
              "Spacer",
              spacerPosition,
              spacerColour,
              spacerType,
            ])}
          >
            {isBrick4 && <Bricks4 />}
            {isBrick6 && <Bricks6 />}
            {isDots1 && <Dots1 />}
            {isDots2 && <Dots2 />}
            {isDots3 && <Dots3 />}
            {isDots4 && <Dots4 />}
          </div>
        </Grid>
      </Grid>
    </section>
  );
};
export default Spacer;
