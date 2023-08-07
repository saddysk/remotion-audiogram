import { FC } from "react";
import "./style.css";
import { Composition, staticFile } from "remotion";
import { AudiogramComposition, fps } from "./Composition";
import { AudiogramSchema } from "./Schema";

interface RemotionRootProps {}

const RemotionRoot: FC<RemotionRootProps> = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1920}
        height={1080}
        schema={AudiogramSchema}
        defaultProps={{
          // Audio settings
          //   TODO: #1
          durationInSeconds: 29.5,
          //   TODO: #2
          audioOffsetInSeconds: 6.9,

          // Title settings
          //   TODO: #3
          audioFileName: staticFile("audiogram/audio.mp3"),
          //   TODO: #4
          coverImgFileName: staticFile("audiogram/cover.jpg"),
          //   TODO: #5
          titleText:
            "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
          titleColor: "rgba(186, 186, 186, 0.93)",

          // Subtitles settings
          //   TODO: #6
          subtitles: staticFile("audiogram/subtitles.srt"),
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
          subtitlesLinePerPage: 3,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,

          // Wave settings
          waveColor: "#a3a5ae",
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 40,
          waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
          mirrorWave: true,
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * fps,
            props,
          };
        }}
      />
    </>
  );
};

export default RemotionRoot;
