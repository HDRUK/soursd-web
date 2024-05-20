import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

export type OverlayCenterProps = BoxProps;

export default function OverlayCenter({
  children,
  sx,
  ...restProps
}: OverlayCenterProps) {
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
