import React from "react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import { useDevice } from "@zepp/utils";
import Grid from "../Grid/Grid";
import Image from "../Image/Image";
import Components from "../__Components__/Components";
import styles from "./RichText.module.scss";

export type RichTextProps = {
  richText: any;
  isPrintable?: boolean;
};

export const RichText = (props: {
  content: RichTextProps;
  isNested?: boolean;
}) => {
  const { content, isNested } = props;
  const { richText, isPrintable } = content;

  const RichTextBase = () => {
    return (
      <>
        {documentToReactComponents(richText, {
          renderNode: {
            [INLINES.HYPERLINK]: (node, renderedValues) => {
              return (
                <Link href={node.data.uri} passHref>
                  <a target="_blank" rel="noopener">
                    {renderedValues}
                  </a>
                </Link>
              );
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              console.log(node);
              return (
                <div>
                  <Image
                    src={node.data.target.fields.file.url}
                    alt={node.data.target.fields.file.fileName}
                    width={node.data.target.fields.file.details.image.width}
                    height={node.data.target.fields.file.details.image.height}
                  />
                </div>
              );
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
              const component = {
                component: node.data.target.sys.contentType.sys.id,
                uid: node.data.target.sys.id,
                ...node.data.target.fields,
              };
              return Components(component, {...node.data.target.fields, isNested: true});
            },
            [INLINES.EMBEDDED_ENTRY]: (node) => {
              const component = {
                component: node.data.target.sys.contentType.sys.id,
                uid: node.data.target.sys.id,
                ...node.data.target.fields,
              };
              return Components(component, {...node.data.target.fields, isNested: true});
            },
            [INLINES.ENTRY_HYPERLINK]: (node, text) => {
              const { slug } = node.data.target.fields;
              return (
                <Link href={`/${slug}`} passHref>
                  <a>{text}</a>
                </Link>
              );
            },
            [INLINES.ASSET_HYPERLINK]: (node) => {
              const { title, file } = node.data.target.fields;
              const { url } = file;
              return (
                <Link href={url} passHref>
                  <a target="_blank" rel="noopener">
                    {title}
                  </a>
                </Link>
              );
            },
          },
        })}
      </>
    );
  };

  if (isNested) {
    return <RichTextBase />;
  }

  const device = useDevice();
  const isMobile = device === "mobile";

  return (
    <section className={styles.Wrapper} data-printable={isPrintable}>
      <Grid row>
        {!isMobile && <Grid column md={1} />}
        <Grid column sm={12} md={8}>
          <RichTextBase />
        </Grid>
      </Grid>
    </section>
  );
};
export default RichText;
