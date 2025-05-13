import { BoxProps } from "@mui/system";
export interface OverlayCenterProps extends BoxProps {
    variant?: "screen" | "contained";
}
export default function OverlayCenter({ variant, children, sx, ...restProps }: OverlayCenterProps): import("react/jsx-runtime").JSX.Element;
