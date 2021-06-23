import React from "react";
import Grid from "../Grid/Grid";
import Logo from "../../public/image/svg/logo.svg";
import styles from "../HoldingPage/HoldingPage.module.scss";

export type HoldingPageProps = {
  title: string;
};

export const HoldingPage = ({ title }: HoldingPageProps) => {
  return (
    <section className={styles.Wrapper}>
      <Grid row justify="center">
        <Grid column sm={12}>
          <div className={styles.HoldingPageWrapper}>
            <section className={styles.Logo}>
              <div className={styles.LogoWrapper}>
                <Logo />
              </div>
            </section>
            <header className={styles.Header}>
              <h1 className={styles.Title}>{title}</h1>
            </header>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default HoldingPage;
