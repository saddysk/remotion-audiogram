import { Input } from "@chakra-ui/react";
import { FC, forwardRef } from "react";

interface InputFileProps {
  id?: string;
  accept?: string;
  ref?: React.Ref<HTMLInputElement>;
  handleOnChange: (value: string) => void;
}

const InputFile: FC<InputFileProps> = forwardRef<
  HTMLInputElement,
  InputFileProps
>(({ handleOnChange, ...props }, forwardedRef) => {
  const handleChange = (e: any) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleOnChange(reader.result as string);
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <>
      <Input
        ref={forwardedRef}
        type="file"
        size="sm"
        {...props}
        onChange={handleChange}
      />
    </>
  );
});

InputFile.displayName = "InputFile";

export default InputFile;
