import React from "react";
import { useDevice } from "@zepp/utils";
import Grid from "../Grid/Grid";
import styles from "./DownloadPrintContent.module.scss";
import PrintIcon from "../../public/image/svg/Print-icon.svg";
import DownloadIcon from "../../public/image/svg/Download-icon.svg";

// declare global {
//   interface Window {
//       dataLayer: any;
//   }
// }


export type DownloadPrintContentProps = {
  asset: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
};

export const DownloadPrintContent = (props: {
  content: DownloadPrintContentProps;
}) => {
  const { content } = props;
  const { asset: component_fields } = content;
  const { fields: document_fields } = component_fields;
  const { file, title } = document_fields;

  const device = useDevice();
  const isMobile = device === "mobile";

  const print = () => {
    const printableContents = document.querySelectorAll("[data-printable]");
    const originalContents = document.body.innerHTML;

    let printContents = "";
    for (let i = 0; i < printableContents.length; i++) {
      printContents += `<section>${printableContents[i].innerHTML}</section>`;
    }
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  };

  return (
    <section className={styles.Wrapper} data-print-hide="true">
      <Grid row>
        {!isMobile && <Grid column md={1} />}
        <Grid column sm={12} md={8}>
          <div className={styles.Container}>
            <div>
              <a className={styles.CTA} href={file.url} target="_blank" onClick={() => {
                //@ts-ignore
                window.dataLayer.push({
                  'event': 'GAEvent',
                  'eventCategory' : 'Download',
                  'eventAction' : file.url,
                });
              }}>
                <div className={styles.ButtonStyleOne}>
                  <div className={styles.IconWrapper}>
                    <DownloadIcon className="DownloadButton" />
                  </div>
                </div>
                <span className={`${styles.Label} DownloadButton`}>Download</span>
              </a>
            </div>
            <div>
              <button className={styles.Button} onClick={() => {
                //@ts-ignore
                  window.dataLayer.push({
                    'event': 'GAEvent',
                    'eventCategory' : 'Print',
                  });
                print();
                }}>
                <div className={styles.ButtonStyleOne}>
                  <div className={styles.IconWrapper}>
                    <PrintIcon className="PrintButton" />
                  </div>
                </div>
                <span className={`${styles.Label} PrintButton`}>Print</span>
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default DownloadPrintContent;
