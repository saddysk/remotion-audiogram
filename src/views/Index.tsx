import { FC, useState } from "react";
import AudioInputs, { defaultAudioData } from "./Audio";
import { Audiogram } from "../audiogram/Root";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { IAudioInput } from "../interfaces/AudioInputInterface";

interface AudiogramIndexProps {}

const AudiogramIndex: FC<AudiogramIndexProps> = () => {
  let [audioInputs, setAudioInputs] = useState<IAudioInput>(defaultAudioData);

  const hasRequiredInputs =
    audioInputs.audioFile && audioInputs.srtFile && audioInputs.coverImage;

  return (
    <>
      <Text fontSize="3xl" align="center" my={8}>
        AudioGram
      </Text>
      <Grid templateColumns={["1fr", "1fr 1fr"]} p={10}>
        <GridItem>
          <AudioInputs handleUpload={(data) => setAudioInputs(data)} />
        </GridItem>
        <GridItem>
          {hasRequiredInputs ? (
            <Audiogram audioInputs={audioInputs} />
          ) : (
            <Flex alignItems="center" justifyContent="center">
              <Text>Waiting for the files to upload...</Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default AudiogramIndex;
