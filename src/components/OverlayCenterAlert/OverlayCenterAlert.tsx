import { ScalingUp } from "../../consts/ui";
import { AlertColor } from "@mui/material";
import { Message, MessageProps } from "../Message";
import OverlayCenter, { OverlayCenterProps } from "../OverlayCenter";

interface OverlayCenterAlertProps extends OverlayCenterProps {
  color?: AlertColor;
  messageProps?: MessageProps;
}

export default function OverlayCenterAlert({
  children,
  maxWidth = "350px",
  color = "error",
  messageProps,
  ...restProps
}: OverlayCenterAlertProps) {
  return (
    <OverlayCenter {...restProps}>
      <Message
        {...messageProps}
        color={color}
        sx={{
          maxWidth,
          transform: `scale(${ScalingUp.medium})`,
          ...messageProps?.sx,
        }}>
        {children}
      </Message>
    </OverlayCenter>
  );
}
