import React, { useState, useRef, useEffect } from "react";
import styles from "./Accordion.module.scss";
import { useDevice } from "@zepp/utils";
import RichText from "@components/RichText/RichText";
import Chevron from "../../public/image/svg/chevron.svg";
import { styleNames } from "@zepp/utils";

export type RichTextProps = {
  richText: any;
  isPrintable?: boolean;
};

export const Accordionitem = (props: { fields: any }) => {
  const { title, textContent } = props.fields;
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(500);
  const contentRef: any = useRef();
  const device = useDevice();

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
      }
    }, 100);
  }, [contentRef, device]);

  useEffect(() => {
    function handleResize() {
      if (contentRef.current) {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.AccordionItem}>
      <h3 className={styles.AccordionItemTitle} onClick={() => {
        setOpen(!open);
      }}>
        {title} <Chevron className={styleNames(styles, ["Chevron", open && "Chevron--Open"])} />
      </h3>

      <div className={styles.AccordionItemContent} style={{height: open ? contentHeight : 0}}>
        <div className={styles.AccordionItemContentContainer} ref={contentRef}>
          <RichText content={{ richText: textContent }} isNested />
        </div>
      </div>
    </div>
  );
};
export default Accordionitem;
