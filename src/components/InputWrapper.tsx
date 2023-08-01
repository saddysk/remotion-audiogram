import { FC, ReactNode } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

interface InputWrapperProps {
  id?: string;
  label?: string;
  description?: string;
  children?: ReactNode;
}

const InputWrapper: FC<InputWrapperProps> = ({
  id,
  label,
  description,
  children,
  ...props
}) => {
  return (
    <>
      <FormControl>
        <FormLabel htmlFor={id} mb={2} {...props}>
          {label}
        </FormLabel>
        {children}
        {description && (
          <FormHelperText fontSize="sm">{description}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default InputWrapper;
