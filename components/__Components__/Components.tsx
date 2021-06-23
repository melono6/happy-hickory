import React from "react";
import Content from "@components/Content/Content";
import FormPage from "@components/PageTemplates/Form/Form";
import LandingPage from "@components/LandingPage/LandingPage";
import HeroBanner from "@components/HeroBanner/HeroBanner";
import PagePromo from "@components/PagePromo/PagePromo";
import RichText from "@components/RichText/RichText";
import Video from "@components/Video/Video";
import Spacer from "@components/Spacer/Spacer";
import Introduction from "@components/Introduction/Introduction";
import Heading from "@components/Heading/Heading";
import DownloadPrintContent from "@components/DownloadPrintContent/DownloadPrintContent";
import Embed from "@components/Embed/Embed";
import List from "@components/List/List";
import Accordion from "@components/Accordion/Accordion";

const Components = {
  content: Content,
  landingPage: LandingPage,
  formPage: FormPage,
  heroBanner: HeroBanner,
  pagePromo: PagePromo,
  richText: RichText,
  videoPlayer: Video,
  spacer: Spacer,
  pageIntroduction: Introduction,
  sectionIntroduction: Introduction,
  sectionHeading: Heading,
  downloadPrintContent: DownloadPrintContent,
  embed: Embed,
  list: List,
  accordionBlock: Accordion,
};

type BlockProps = {
  component: string;
  uid: string;
};

export const Index = (block: BlockProps, otherProps?: object) => {
  if (typeof Components[block?.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block.uid,
      content: block,
      ...otherProps,
    });
  }
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block.uid }
  );
};
export default Index;
