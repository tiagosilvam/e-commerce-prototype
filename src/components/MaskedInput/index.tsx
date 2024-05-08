import { InputBaseComponentProps } from "@mui/material";
import { Ref, forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface MaskedInputProps {
  onChange: (event: { target: { value: string } }) => void;
}

export const MaskedInput = forwardRef(function TextField(
  props: InputBaseComponentProps & MaskedInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { value } })}
    />
  );
});
