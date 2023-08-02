import { FC, useEffect, useState } from "react";
import InputFile from "../components/ui/InputFile";
import { Button, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IAudioDuration, IAudioInput } from "../interfaces/AudioInputInterface";
import InputText from "../components/ui/InputText";
import InputWrapper from "../components/ui/InputWrapper";
import AudioDuration from "../components/audio/Duration";
import { MediaDuration } from "../utils/file";

interface AudioInputsProps {
  handleUpload: (data: IAudioInput) => void;
}

export const defaultAudioData: IAudioInput = {
  title: "",
  audioFile: "",
  coverImage: "",
  srtFile: "",
  duration: {
    startTime: 0,
    endTime: 0,
  },
};

const AudioInputs: FC<AudioInputsProps> = ({ handleUpload }) => {
  const [durationInSeconds, setDurationInSeconds] = useState<number>();
  const [audioDuration, setAudioDuration] = useState<IAudioDuration>({
    startTime: 0,
    endTime: 0,
  });

  const { handleSubmit, register, setValue, getValues, watch } =
    useForm<IAudioInput>({
      defaultValues: defaultAudioData,
    });

  const audioFileSrc = watch("audioFile");

  const fetchDurationAsync = async () => {
    const duration = await MediaDuration(audioFileSrc);

    setDurationInSeconds(duration); // 29.5

    const maxDurationInMins = Number((duration / 60).toFixed(1));
    setAudioDuration({ ...audioDuration, endTime: maxDurationInMins });
  };

  useEffect(() => {
    fetchDurationAsync();
  }, [audioFileSrc]);

  const onSubmit = (data: IAudioInput) => {
    if (
      !getValues("audioFile") ||
      !getValues("srtFile") ||
      !getValues("coverImage")
    ) {
      return;
    }

    handleUpload({ ...data, duration: audioDuration });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="start" w={"75%"} gap={6} mx="auto">
        <InputWrapper id="videoTitle" label="Video title" optional={true}>
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

        {durationInSeconds && (
          <InputWrapper
            id="duration"
            label="Select duration (in mins)"
            optional={true}
          >
            <AudioDuration
              duration={durationInSeconds}
              audioDuration={audioDuration}
              setAudioDuration={setAudioDuration}
            />
          </InputWrapper>
        )}

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
          Upload
        </Button>
      </VStack>
    </form>
  );
};

export default AudioInputs;
