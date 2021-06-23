import React from "react";
import styles from "./Accordion.module.scss";
import { useDevice } from "@zepp/utils";
import AccordionItem from "@components/Accordion/AccordionItem";
import Grid from "../Grid/Grid";
import { styleNames } from "@zepp/utils";

export type RichTextProps = {
  richText: any;
  isPrintable?: boolean;
};

export const Table = (props: { content: any, isNested: boolean }) => {

  const { isNested } = props;
  const { accordionItems } = props.content;

  const device = useDevice();
  const isMobile = device === "mobile";

  

  if (isNested) {
    return (
      <div className={styleNames(styles, ["Accordion", isNested && "Accordion--Nested"])}>
        {accordionItems.map(accordionItem => {
          return <AccordionItem fields={accordionItem.fields} />
        })}
      </div>
    );
  }
  return (
    <div className={styles.Accordion}>
      <Grid row>
        {!isMobile && <Grid column md={1} />}
        <Grid column sm={12} md={8}>
          {accordionItems.map(accordionItem => {
            return <AccordionItem fields={accordionItem.fields} />
          })}
        </Grid>
      </Grid>
    </div>
  );
};
export default Table;
