import React, { useEffect, useState } from "react";
import styles from "./CookieBanner.module.scss";
import { getCookie, setCookie, styleNames } from "@zepp/utils";
import Link from "next/link";

export type CookieBannerProps = {
  title: string;
  information: string;
  buttonText: string;
  cookiePolicyLink: {
    fields: {
      slug: string;
    };
  };
  cookiePolicyLinkText: string;
};

const useDelayUnmount = (isMounted: boolean, delayTime: number): boolean => {
  const [showDiv, setShowDiv]: [boolean, Function] = useState(false);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay our unmount
    }
    return () => clearTimeout(timeoutId); // cleanup mechanism for effects, the use of setTimeout generate a sideEffect
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
};

export const CookieBanner = (props: { content: CookieBannerProps }) => {
  const { content } = props;
  const {
    title,
    information,
    buttonText,
    cookiePolicyLinkText,
    cookiePolicyLink,
  } = content;
  const { fields: cookie_policy_fields } = cookiePolicyLink;
  const { slug } = cookie_policy_fields;

  const [showBanner, setShowBanner]: [boolean, Function] = useState(false);
  const showDiv: boolean = useDelayUnmount(showBanner, 300);

  useEffect(() => {
    const cookie = getCookie("cookieAccepted");
    if (!cookie) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookie = () => {
    setShowBanner(false);
    setCookie({
      cookieName: "cookieAccepted",
      value: true,
      expiryDays: 365,
    });
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

  return (
    <>
      {showDiv && (
        <div
          className={styleNames(styles, [
            "CookieBanner",
            showBanner && "CookieBanner--show",
          ])}
        >
          <div className={styles.Inner}>
            <div className={styles.CopyWrapper}>
              <h4 className={styles.Title}>{title}</h4>
              <p className={styles.Information}>{information}</p>
              <p className={styles.Policy}>
                <Link href={`/${slug}`} passHref>
                  {cookiePolicyLinkText}
                </Link>
              </p>
            </div>

            <button className={styles.Button} onClick={acceptCookie}>
              <PrimaryDots />
              <span className={styles.ButtonText}>{buttonText}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
