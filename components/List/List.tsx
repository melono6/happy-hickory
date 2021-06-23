import React from "react";
import styles from "./List.module.scss";
import { useDevice } from "@zepp/utils";

export type RichTextProps = {
  richText: any;
  isPrintable?: boolean;
};

export const Table = (props: {
  content: any;
}) => {
  const { item, columnCount } = props.content;

  const device = useDevice();
  const isMobile = device === "mobile";

  const columns = isMobile ? Math.floor(columnCount / 2) : columnCount;

  return (
    <ul className={styles.List} style={{columnCount: columns || 1}}>
      {item.map((text) => {
         return <li>{text}</li>;
      })}
    </ul>
  );
};
export default Table;