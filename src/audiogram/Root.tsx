import { FC, useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { AudiogramPlayer } from "./Player";
import { AudiogramSchema } from "./Schema";
import { VStack } from "@chakra-ui/react";
import useAudioContext from "../contexts/AudioContext";

export const fps = 30;

interface AudiogramProps {}

export const Audiogram: FC<AudiogramProps> = () => {
  const { audioInput } = useAudioContext();
  const { title, audioFile, srtFile, coverImage, duration } = audioInput;

  const [durationInSeconds, setDurationInSeconds] = useState<number>();

  useEffect(() => {
    const audioDuration = (duration.endTime - duration.startTime) * 60;

    setDurationInSeconds(Math.round(audioDuration));
  }, [duration]);

  if (!durationInSeconds) {
    return <></>;
  }

  const audioOffsetInSeconds = Math.round(duration.startTime * 60);

  return (
    <VStack justifyContent="center" gap={6}>
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
          audioOffsetInSeconds,

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

      {/* <Button colorScheme="blue">Render video</Button> */}
    </VStack>
  );
};
