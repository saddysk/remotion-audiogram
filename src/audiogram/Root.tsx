import { FC, useState } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { Flex } from "@chakra-ui/react";
import { IAudioInput } from "../interfaces/AudioInputInterface";

const fps = 30;

interface AudiogramProps {
  audioInputs: IAudioInput;
}

export const Audiogram: FC<AudiogramProps> = ({ audioInputs }) => {
  const { title, audioFile, srtFile, coverImage } = audioInputs;
  const [durationInSeconds, setDurationInSeconds] = useState<number>();

  // const audioFile = staticFile("audiogram/audio.mp3");
  // const srtFile = staticFile("audiogram/subtitles.srt");
  // const coverImage = staticFile("audiogram/cover.jpg");

  const audio = new Audio(audioFile);
  audio.addEventListener("loadedmetadata", () => {
    const duration = Number(audio.duration.toFixed(1));
    setDurationInSeconds(duration); // 29.5
  });

  if (!durationInSeconds) {
    return <></>;
  }

  return (
    <Flex justifyContent="center">
      <Player
        style={{
          width: "350px",
          height: "475px",
          borderRadius: "12px",
          backgroundColor: "#1b1a18",
        }}
        component={AudiogramPlayer}
        schema={AudiogramSchema}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={fps}
        durationInFrames={durationInSeconds * fps}
        controls
        loop
        inputProps={{
          // !Audio settings
          audioOffsetInSeconds: 0,

          // !Title settings
          audioFileName: audioFile,
          coverImgFileName: coverImage,
          titleText: title ?? "Video title",
          // "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
          titleColor: "rgba(186, 186, 186, 0.93)",

          // !Subtitles settings
          subtitlesFileName: srtFile,
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
          subtitlesLinePerPage: 4,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,

          // !Wave settings
          waveColor: "#a3a5ae",
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 29,
          waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
          mirrorWave: true,
        }}
      />
    </Flex>
  );
};
