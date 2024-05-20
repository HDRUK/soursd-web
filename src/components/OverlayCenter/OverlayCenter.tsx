import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

type FullscreenProps = BoxProps;

export default function Fullscreen({
  children,
  sx,
  ...restProps
}: FullscreenProps) {
  return (
    <Box
      {...restProps}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
        ...sx,
      }}>
      {children}
    </Box>
  );
}
