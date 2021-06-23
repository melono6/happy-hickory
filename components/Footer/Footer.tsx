import React from "react";
import { useDevice } from "@zepp/utils";
import { NavActiveLink } from "@zepp/react";
import Grid from "../Grid/Grid";
import Image from "../Image/Image";
import styles from "./Footer.module.scss";

export type FooterProps = {
  copyrightText: string;
  contactLink: {
    fields: {
      internalLink: {
        fields: {
          slug: string;
        };
      };
      linkText: string;
    };
  };
  hygieneLinks: {
    fields: {
      internalLink: {
        fields: {
          slug: string;
        };
      };
      linkText: string;
    };
    sys: {
      id: string;
    };
  }[];
  socialMedia: {
    fields: {
      accessibleText: string;
      linkToSocialMediaPage: string;
      socialMediaIcon: {
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
  }[];
  theArtInformation: string;
  charity: {
    fields: {
      charityTitle: string;
      charityLink: string;
      charityLogo: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  };
};

export const Footer = (props: { content: FooterProps }) => {
  const { content } = props;
  const {
    copyrightText,
    contactLink,
    hygieneLinks,
    socialMedia,
    theArtInformation,
    charity,
  } = content;
  const { fields: logo_fields } = charity;
  const { charityTitle, charityLink, charityLogo } = logo_fields;
  const { fields: charityLogo_fields } = charityLogo;
  const { file: charityLogo_file } = charityLogo_fields;
  const { fields: contactLink_linkText } = contactLink;
  const { linkText, internalLink } = contactLink_linkText;

  const device = useDevice();
  const isMobile = device === "mobile";
  
  const SocialShare = () => {
    return (
      <div className={styles.SocialShareContainer}>
        {socialMedia?.map((socialMediaItem) => {
          const { fields: social_fields, sys: social_sys } = socialMediaItem;
          
          if (!social_fields) {
            return null;
          }
          const {
            accessibleText,
            linkToSocialMediaPage,
            socialMediaIcon,
          } = social_fields;
          const { id } = social_sys;
          const { fields: file } = socialMediaIcon;

          return (
            <a
              key={id}
              target="_blank"
              rel="noopener"
              href={linkToSocialMediaPage}
              className={styles.IconWrapper}
            >
              <img
                className={styles.Icon}
                src={file.file.url}
                alt={accessibleText}
              />
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <footer className={styles.Wrapper}>
      <Grid row>
        <Grid column sm={12} md={6}>
          <div className={styles.ItemsContainer}>
            {internalLink.fields.slug && (
              <div className={styles.ContactSection}>
                <div>
                  <NavActiveLink
                    href={`/${internalLink.fields.slug}`}
                    useAsPath
                    activeClassName={styles.ActiveLink}
                  >
                    <a className={styles.Item}>{linkText}</a>
                  </NavActiveLink>
                </div>
                {!isMobile && <SocialShare />}
              </div>
            )}

            {hygieneLinks && (
              <div className={styles.HygieneLinksWrapper}>
                {hygieneLinks?.map((hygieneLink) => {
                  const {
                    fields: hygieneLink_linkText,
                    sys: hygieneLink_sys,
                  } = hygieneLink;
                  const { id } = hygieneLink_sys;
                  const { linkText, internalLink } = hygieneLink_linkText;
                  return (
                    <div key={id}>
                      <NavActiveLink
                        href={`/${internalLink.fields.slug}`}
                        useAsPath
                        activeClassName={styles.ActiveLink}
                      >
                        <a className={styles.Item}>{linkText}</a>
                      </NavActiveLink>
                    </div>
                  );
                })}
                {isMobile && <SocialShare />}
              </div>
            )}
          </div>
        </Grid>

        <Grid column sm={12} md={6}>
          <div className={styles.InfoContainer}>
            {charityLogo_file.url && (
              <div className={styles.LogoWrapper}>
                <a target="_blank" rel="noopener" href={charityLink}>
                  <Image
                    src={charityLogo_file.url}
                    alt={charityTitle}
                    width={157}
                    height={56}
                  />
                </a>
              </div>
            )}

            {theArtInformation && (
              <p className={styles.Info}>{theArtInformation}</p>
            )}
          </div>
          {copyrightText && <p className={styles.Copyright}>{copyrightText}</p>}
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
