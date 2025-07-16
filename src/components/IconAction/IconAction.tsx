import { CircularProgress, Box, BoxProps } from "@mui/material";

export interface IconActionProps extends BoxProps {
  loading?: boolean;
  disabled?: boolean;
}

export default function IconAction({
  loading,
  children,
  sx,
  disabled,
  ...restProps
}: IconActionProps) {
  let sxProps: BoxProps["sx"] = {
    cursor: "pointer",
  };

  if (disabled) {
    sxProps = {
      pointerEvents: "none",
      color: "inactive.main",
    };
  }

  return (
    <Box
      component="span"
      sx={{
        ...sx,
        ...sxProps,
      }}
      {...restProps}>
      {loading ? <CircularProgress /> : children}
    </Box>
  );
}
