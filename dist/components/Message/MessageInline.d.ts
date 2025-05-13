import { AlertProps } from "@mui/material";
export interface MessageInlineProps extends AlertProps {
    isDismissable?: boolean;
}
export default function MessageInline({ children, isDismissable, sx, ...restProps }: MessageInlineProps): false | import("react/jsx-runtime").JSX.Element;
