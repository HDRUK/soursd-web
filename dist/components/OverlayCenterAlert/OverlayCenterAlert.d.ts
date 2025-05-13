import { AlertColor } from "@mui/material";
import { MessageProps } from "../Message";
import { OverlayCenterProps } from "../OverlayCenter";
interface OverlayCenterAlertProps extends OverlayCenterProps {
    color?: AlertColor;
    messageProps?: MessageProps;
}
export default function OverlayCenterAlert({ children, maxWidth, color, messageProps, ...restProps }: OverlayCenterAlertProps): import("react/jsx-runtime").JSX.Element;
export {};
