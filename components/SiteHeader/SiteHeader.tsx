import React, { useState, useRef } from "react";
import Link from "next/link";
import Grid from "../Grid/Grid";
import Logo from "../../public/image/svg/logo.svg";
import MenuIcon from "../../public/image/svg/menu.svg";
import CloseIcon from "../../public/image/svg/close.svg";
import Chevron from "../../public/image/svg/chevron.svg";
import ExternalLinkIcon from "../../public/image/svg/external-link-icon.svg";
import styles from "./SiteHeader.module.scss";
import { NavActiveLink } from "@zepp/react";
import { styleNames, useDevice, useOnClickOutsideOrEscape } from "@zepp/utils";

export type SiteHeaderProps = {
  headerNavigation: HeaderNavigationProps[];
  loginNavigation: LoginNavigationProps[];
  loginButtonText: string;
  metadata: {
    fields: {
      title: string;
    };
  };
};

type LoginNavigationProps = {
  fields: {
    navTitle: string;
    url: string;
    ariaLabel: string;
  };
};

type HeaderNavigationProps = {
  fields: {
    navTitle: string;
    pageLink: {
      fields: {
        slug: string;
      };
    };
  };
  sys: {
    id: string;
  };
};

export const SiteHeader = (props: { content: SiteHeaderProps }) => {
  const { content } = props;
  const {
    headerNavigation,
    loginNavigation,
    loginButtonText = "Login",
    metadata,
  } = content;
  const [open, setOpen] = useState(false);
  const [showLoginLinks, setShowLoginLinks] = useState(false);
  const device = useDevice("tablet-landscape");
  const isMobile = device === "mobile" || device === "tablet";

  const { fields: metadata_fields } = metadata;
  const { title } = metadata_fields;

  const desktopLoginLinksRef: any = useRef();
  useOnClickOutsideOrEscape(desktopLoginLinksRef, () => {
    if (!isMobile) {
      setShowLoginLinks(false);
    }
  });

  return (
    <>
      <div>
        <a href="#skipnav" className={styles.Skip}>
          Skip to main content
        </a>
      </div>
      <header className={styles.Wrapper}>
        <style>
          {`
          body {
            overflow: ${open && isMobile ? "hidden" : "auto"};
          }
        `}
        </style>
        <Grid row alignItems="center">
          <Grid column md={2} sm={6}>
            <div className={styles.LogoWrapper}>
              <Link href="/" passHref>
                <a
                  className={styles.LogoLink}
                  onClick={() => setOpen(false)}
                  aria-label={title}
                >
                  <Logo />
                </a>
              </Link>
            </div>
          </Grid>
          <Grid column md={10} sm={6}>
            <Grid column={!isMobile} row={isMobile} justify="flex-end">
              <button
                className={styles.MenuIcon}
                onClick={() => setOpen(!open)}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </button>
              <div
                className={styleNames(styles, [
                  "LoginWrapper",
                  open && "LoginWrapper--Open",
                ])}
              >
                <div
                  className={styleNames(styles, [
                    "LoginWrapperInner",
                    open && "LoginWrapperInner--Open",
                  ])}
                  ref={desktopLoginLinksRef}
                >
                  <button
                    onClick={() => {
                      setShowLoginLinks(!showLoginLinks);
                    }}
                    className={styleNames(styles, [
                      "Link",
                      "LoginButton",
                      showLoginLinks && "Link--Open",
                    ])}
                  >
                    <span>{loginButtonText}</span> <Chevron />
                  </button>
                  <div className={styles.LoginDesktopContainer}>
                    {showLoginLinks && (
                      <>
                        {loginNavigation.map(({ fields }) => {
                          const { navTitle, url, ariaLabel } = fields;
                          return (
                            <div className={styles.NavItem} key={url}>
                              <NavActiveLink
                                href={url}
                                useAsPath
                                activeClassName={styles.ActiveLink}
                              >
                                <a
                                  className={styles.LoginLink}
                                  target="_blank"
                                  aria-label={ariaLabel}
                                >
                                  <span className={styles.LoginNavigationText}>
                                    {navTitle}
                                  </span>
                                  <ExternalLinkIcon />
                                </a>
                              </NavActiveLink>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <aside
                    className={styleNames(styles, [
                      "MenuWrapper",
                      open && "MenuWrapper--Open",
                    ])}
                  >
                    <div
                      className={styleNames(styles, [
                        "Navigation",
                        open && "Navigation--Open",
                      ])}
                    >
                      {headerNavigation?.map((navItem) => {
                        const {
                          fields: nav_item_fields,
                          sys: nav_item_sys,
                        } = navItem;
                        const { navTitle, pageLink } = nav_item_fields;
                        const { fields: page_link_fields } = pageLink;
                        const { slug } = page_link_fields;
                        const { id } = nav_item_sys;
                        return (
                          <NavActiveLink
                            key={id}
                            href={`/${slug}`}
                            useAsPath
                            activeClassName={styles.ActiveLink}
                          >
                            <a
                              className={styles.Link}
                              onClick={() => {
                                setOpen(!open);
                              }}
                            >
                              {navTitle}
                            </a>
                          </NavActiveLink>
                        );
                      })}
                      {isMobile && (
                        <>
                          <a
                            className={styleNames(styles, [
                              "Link",
                              showLoginLinks && "Link--Open",
                            ])}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowLoginLinks(!showLoginLinks);
                            }}
                          >
                            {loginButtonText} <Chevron />
                          </a>
                          {showLoginLinks && (
                            <>
                              {loginNavigation.map(({ fields }) => {
                                const { navTitle, url } = fields;
                                return (
                                  <NavActiveLink
                                    href={url}
                                    useAsPath
                                    activeClassName={styles.activeLink}
                                    key={url}
                                  >
                                    <a
                                      className={styleNames(styles, [
                                        "Link",
                                        "Link--Login",
                                      ])}
                                      target="_blank"
                                    >
                                      {navTitle} <ExternalLinkIcon />
                                    </a>
                                  </NavActiveLink>
                                );
                              })}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </header>
      <div id="skipnav"></div>
    </>
  );
};
export default SiteHeader;
