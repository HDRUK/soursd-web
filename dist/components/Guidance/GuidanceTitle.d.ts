import { ReactNode } from "react";
import { TextProps } from "../Text";
export interface GuidanceTitleProps extends TextProps {
    infoTitleIcon?: ReactNode;
}
export default function GuidanceTitle({ children, infoTitleIcon, ...restProps }: GuidanceTitleProps): import("react/jsx-runtime").JSX.Element;
