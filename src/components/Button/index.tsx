import { LoadingButton, LoadingButtonProps } from "@mui/lab";

type ButtonProps = {
  name: string;
};

export const Button = (props: LoadingButtonProps & ButtonProps) => {
  return (
    <LoadingButton {...props} variant={props.variant ?? "contained"}>
      {props.name}
    </LoadingButton>
  );
};
