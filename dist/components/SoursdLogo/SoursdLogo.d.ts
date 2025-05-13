import { BoxProps } from "@mui/system";
export interface SoursdLogoProps extends Omit<BoxProps, "color"> {
    color?: "default" | "white";
    variant?: "basic" | "titled";
    size?: number;
}
export default function SoursdLogo({ variant, size, color, ...restProps }: SoursdLogoProps): import("react/jsx-runtime").JSX.Element;
