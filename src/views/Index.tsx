import { FC } from "react";
import AudioInput from "./Audio";
import { Audiogram } from "../audiogram/Audiogram";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import useAudioContext from "../contexts/AudioContext";

interface AudiogramIndexProps {}

const AudiogramIndex: FC<AudiogramIndexProps> = () => {
  const { audioInput, setAudioInput } = useAudioContext();

  const hasRequiredInputs =
    audioInput.audioFile && audioInput.srtFile && audioInput.coverImage;

  return (
    <>
      <Text fontSize="3xl" align="center" my={8}>
        AudioGram
      </Text>
      <Grid templateColumns={["1fr", "1fr 1fr"]} p={10}>
        <GridItem>
          <AudioInput handleUpload={(data) => setAudioInput(data)} />
        </GridItem>
        <GridItem>
          {hasRequiredInputs ? (
            <Audiogram />
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
