import { NumberInput, NumberInputField, Stack } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import InputWrapper from "../ui/InputWrapper";
import { IAudioDuration } from "../../interfaces/AudioInputInterface";

interface AudioDurationProps {
  duration: number;
  audioDuration: IAudioDuration;
  setAudioDuration: Dispatch<SetStateAction<IAudioDuration>>;
}

const AudioDuration: FC<AudioDurationProps> = ({
  duration,
  audioDuration,
  setAudioDuration,
}) => {
  const maxDurationInMins = Number((duration / 60).toFixed(1));

  const handleStartTime = (value: string) => {
    setAudioDuration({ ...audioDuration, startTime: Number(value) });
  };

  const handleEndTime = (value: string) => {
    const endValue = Number(value);

    setAudioDuration({ ...audioDuration, endTime: endValue });

    if (endValue < audioDuration.startTime) {
      setAudioDuration({ ...audioDuration, startTime: endValue });
    }
  };

  return (
    <Stack direction={["column", "row"]}>
      <InputWrapper
        label="Start time"
        description={`min: ${0}; max: ${
          audioDuration.endTime ?? maxDurationInMins
        }`}
      >
        <NumberInput
          value={audioDuration.startTime}
          min={0}
          max={audioDuration.endTime ?? maxDurationInMins}
          clampValueOnBlur={true}
          step={0.1}
          onChange={handleStartTime}
        >
          <NumberInputField />
        </NumberInput>
      </InputWrapper>
      <InputWrapper
        label="End time"
        description={`min: ${0.1}; max: ${maxDurationInMins}`}
      >
        <NumberInput
          value={audioDuration.endTime}
          min={0.1}
          max={maxDurationInMins}
          clampValueOnBlur={true}
          step={0.1}
          onChange={handleEndTime}
        >
          <NumberInputField />
        </NumberInput>
      </InputWrapper>
    </Stack>
  );
};

export default AudioDuration;
