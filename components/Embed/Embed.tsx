import React from "react";
import parse from "html-react-parser";
import { useInView } from "react-hook-inview";
import Grid from "../Grid/Grid";
import styles from "../Embed/Embed.module.scss";

export type EmbedProps = {
  embedCode: string;
};

export const Embed = ({ embedCode }: EmbedProps) => {
  const [embedRef, isVisible] = useInView({
    threshold: 0,
    unobserveOnEnter: true,
  });

  // If embed code is an iFrame, get height.
  const isIframe = embedCode.search("iframe") === 1;
  const regexFindHeight = /height="\s*(\d+)/;
  const isIframeHeight = isIframe && embedCode.match(regexFindHeight);
  const iframeHeight = isIframeHeight?.[1];

  return (
    <section
      className={styles.Wrapper}
      style={{ height: `${iframeHeight ? `${iframeHeight}` : "auto"}` }}
    >
      <Grid row justify="center">
        <Grid column sm={12}>
          <div className={styles.EmbedWrapper}>
            <div ref={embedRef} className={styles.IframeContainer}>
              {isVisible && parse(embedCode)}
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Embed;
