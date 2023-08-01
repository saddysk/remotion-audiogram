import { FC, useEffect, useState } from "react";
import {
  Audio,
  Img,
  Sequence,
  continueRender,
  delayRender,
  useVideoConfig,
} from "remotion";
import { PaginatedSubtitles } from "./Subtitles";
import "./style.css";
import { AudioWave } from "./AudioWave";
import { HStack, Text } from "@chakra-ui/react";

interface AudiogramPlayerProps {
  audioOffsetInSeconds: number;

  audioFileName: string;
  coverImgFileName: string;
  titleText: string;
  titleColor: string;

  subtitlesFileName: string;
  onlyDisplayCurrentSentence: boolean;
  subtitlesTextColor: string;
  subtitlesLinePerPage: number;
  subtitlesZoomMeasurerSize: number;
  subtitlesLineHeight: number;

  waveColor: string;
  waveFreqRangeStartIndex: number;
  waveLinesToDisplay: number;
  waveNumberOfSamples: string;
  mirrorWave: boolean;
}

export const AudiogramPlayer: FC<AudiogramPlayerProps> = ({
  audioOffsetInSeconds,
  audioFileName,
  coverImgFileName,
  titleText,
  titleColor,
  subtitlesFileName,
  onlyDisplayCurrentSentence,
  subtitlesTextColor,
  subtitlesLinePerPage,
  subtitlesLineHeight,
  subtitlesZoomMeasurerSize,
  waveColor,
  waveLinesToDisplay,
  waveFreqRangeStartIndex,
  waveNumberOfSamples,
  mirrorWave,
}) => {
  const { durationInFrames, fps } = useVideoConfig();

  const [handle] = useState(() => delayRender());
  const [subtitles, setSubtitles] = useState<string | null>(null);

  useEffect(() => {
    fetch(subtitlesFileName)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, subtitlesFileName]);

  if (!subtitles) {
    return null;
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <Sequence from={-audioOffsetInFrames}>
      <Audio src={audioFileName} />

      <div className="container">
        <HStack alignItems="start" gap={12}>
          {coverImgFileName && (
            <Img
              className="cover"
              src={coverImgFileName}
              style={{ width: "375px", height: "375px" }}
            />
          )}

          <div style={{ color: titleColor }}>
            <Text fontSize="7xl">{titleText}</Text>
          </div>
        </HStack>

        <div>
          <AudioWave
            audioSrc={audioFileName}
            mirrorWave={mirrorWave}
            waveColor={waveColor}
            numberOfSamples={Number(waveNumberOfSamples)}
            freqRangeStartIndex={waveFreqRangeStartIndex}
            waveLinesToDisplay={waveLinesToDisplay}
          />
        </div>

        <div
          style={{ lineHeight: `${subtitlesLineHeight}px` }}
          className="captions"
        >
          <PaginatedSubtitles
            subtitles={subtitles}
            startFrame={audioOffsetInFrames}
            endFrame={audioOffsetInFrames + durationInFrames}
            linesPerPage={subtitlesLinePerPage}
            subtitlesTextColor={subtitlesTextColor}
            subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
            subtitlesLineHeight={subtitlesLineHeight}
            onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
          />
        </div>
      </div>
    </Sequence>
  );
};
