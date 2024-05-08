import { TextFieldProps, TextField } from "@mui/material";
import { Ref, forwardRef } from "react";

export const Input = forwardRef(function InputField(
  props: TextFieldProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <TextField
      {...props}
      inputRef={ref}
      variant={props.variant ?? "filled"}
      size="small"
    />
  );
});
