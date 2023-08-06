import { FC } from "react";
import InputWrapper from "../ui/InputWrapper";
import InputFile from "../ui/InputFile";
import { getTranscription } from "./transcription";

export interface IInputAudioData {
  value: string;
  fileName: string;
  srtData: string;
  duration: number;
}

interface InputAudioProps {
  handleAudioUpload: (data: IInputAudioData) => void;
}

const InputAudio: FC<InputAudioProps> = ({ handleAudioUpload }) => {
  const onChange = async (value: string, file?: File) => {
    if (!file) {
      return;
    }

    const transcription = await getTranscription(file);
    if (!transcription) {
      return;
    }

    const { srtData, duration } = transcription;

    handleAudioUpload({ value, fileName: file.name, srtData, duration });
  };

  return (
    <>
      <InputWrapper id="audioFile" label="Audio file">
        <InputFile id="audioFile" handleOnChange={onChange} />
      </InputWrapper>
    </>
  );
};

export default InputAudio;
