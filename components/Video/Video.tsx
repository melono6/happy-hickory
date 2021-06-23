import React, { useState } from "react";
import Ratio from "react-ratio";
import ReactPlayer from "react-player/lazy";
import { styleNames } from "@zepp/utils";
import Image from "../Image/Image";
import styles from "../Video/Video.module.scss";

export type VideoProps = {
  preLoadImage?: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
  videoUrl: string;
};

export const VideoPlayer = (props: { content: VideoProps }) => {
  const { content } = props;
  const { videoUrl, preLoadImage } = content;
  const [hideImage, setHideImage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playVideo = () => {
    setHideImage(true);
    setIsPlaying(true);
  };
  const playWrapperHidden = hideImage && "PlayWrapper--Hidden";
  const playerVisible = "Player--Visible";

  const FallbackImage = ({ preLoadImage }) => {
    const { fields } = preLoadImage;
    const { title, file } = fields;
    const { url } = file;
    return (
      <div className={styleNames(styles, ["PlayWrapper", playWrapperHidden])}>
        <Image src={url} alt={title} width={1440} height={810} isSmartCrop />
        <div className={styles.PlayButtonWrapper}>
          <button className={styles.PlayButton} onClick={() => playVideo()}>
            <span className={styles.PlayIcon} />
          </button>
        </div>
      </div>
    );
  };
  return (
    <section className={styles.Wrapper}>
      {videoUrl && (
        <Ratio className={styles.VideoWrapper} ratio={16 / 9}>
          <>
            <ReactPlayer
              className={styleNames(styles, ["Player", playerVisible])}
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              playing={hideImage && isPlaying}
            />
            {preLoadImage && <FallbackImage preLoadImage={preLoadImage} />}
          </>
        </Ratio>
      )}
    </section>
  );
};

export default VideoPlayer;
