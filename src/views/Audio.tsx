import { FC } from "react";
import InputFile from "../components/InputFile";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputText from "../components/InputText";
import { IAudioInput } from "../interfaces/AudioInputInterface";
import InputWrapper from "../components/InputWrapper";

interface AudioInputsProps {
  handleUpload: (data: IAudioInput) => void;
}

export const defaultAudioData: IAudioInput = {
  title: "",
  audioFile: "",
  coverImage: "",
  srtFile: "",
};

const AudioInputs: FC<AudioInputsProps> = ({ handleUpload }) => {
  const { handleSubmit, register, setValue, watch } = useForm<IAudioInput>({
    defaultValues: defaultAudioData,
  });

  const onSubmit = (data: IAudioInput) => {
    handleUpload(data);
  };

  return (
    <Box>
      <Text fontSize="3xl" align="center" mb={8}>
        AudioGram
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems="start" w={"75%"} gap={6} mx="auto">
          <InputWrapper
            id="videoTitle"
            label="Video title"
            description="*optional"
          >
            <InputText
              id="videoTitle"
              placeholder="Title"
              {...register("title")}
              autoFocus
            />
          </InputWrapper>
          <InputWrapper id="audioFile" label="Audio file">
            <InputFile
              id="audioFile"
              handleOnChange={(file, fileName) => {
                setValue("audioFile", file);
                if (!watch("title")) {
                  setValue("title", fileName);
                }
              }}
            />
          </InputWrapper>
          <InputWrapper
            id="audioSrt"
            label="SRT file"
            description="Transcripted audio file."
          >
            <InputFile
              id="audioSrt"
              handleOnChange={(file) => setValue("srtFile", file)}
            />
          </InputWrapper>
          <InputWrapper id="coverImage" label="Cover image for the video">
            <InputFile
              id="coverImage"
              accept="image/*"
              handleOnChange={(file) => setValue("coverImage", file)}
            />
          </InputWrapper>
          <Button colorScheme="teal" type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AudioInputs;
