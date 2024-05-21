import { ScalingUp } from "@/consts/ui";
import { Alert, AlertColor, AlertProps } from "@mui/material";
import OverlayCenter, { OverlayCenterProps } from "../OverlayCenter";

interface OverlayCenterAlertProps extends OverlayCenterProps {
  color?: AlertColor;
  alertProps?: AlertProps;
}

export default function OverlayCenterAlert({
  children,
  maxWidth = "350px",
  color = "error",
  alertProps,
  ...restProps
}: OverlayCenterAlertProps) {
  return (
    <OverlayCenter {...restProps}>
      <Alert
        {...alertProps}
        color={color}
        sx={{
          maxWidth,
          transform: `scale(${ScalingUp.medium})`,
          ...alertProps?.sx,
        }}>
        {children}
      </Alert>
    </OverlayCenter>
  );
}
