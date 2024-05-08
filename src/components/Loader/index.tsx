import {
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

type Props = {
  type?: "circular" | "linear" | "logo";
  label?: string;
};

export const Loader = ({
  type = "circular",
  label,
}: Props & CircularProgressProps & LinearProgressProps) => {
  return (
    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
      {type === "circular" ? (
        <CircularProgress />
      ) : type === "linear" ? (
        <div className="flex w-52 flex-col items-center space-y-3">
          <Typography>{label}</Typography>
          <LinearProgress className="w-full" />
        </div>
      ) : (
        <img
          className="animate-duration-500 h-32 w-32 animate-pulse"
          src="/logo_loader.png"
          alt="loader"
        />
      )}
    </div>
  );
};
