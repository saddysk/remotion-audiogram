import { FC, useState } from "react";
import AudioInputs, { defaultAudioData } from "./Audio";
import { Audiogram } from "../audiogram/Root";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { IAudioInput } from "../interfaces/AudioInputInterface";
import { every, isEmpty } from "lodash";

interface AudiogramIndexProps {}

const AudiogramIndex: FC<AudiogramIndexProps> = () => {
  let [audioInputs, setAudioInputs] = useState<IAudioInput>(defaultAudioData);

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
          {!every(audioInputs, isEmpty) ? (
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
