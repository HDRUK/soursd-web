import { ReactNode } from "react";
export interface GuidanceProps {
    children: ReactNode;
    info: ReactNode;
    infoTitle: ReactNode;
    infoWidth?: number | string;
    infoTitleIcon?: ReactNode;
    defaultExpanded?: boolean;
    hasGuidance?: boolean;
}
export default function Guidance({ children, info, infoTitleIcon, infoWidth, defaultExpanded, infoTitle, hasGuidance, }: GuidanceProps): import("react/jsx-runtime").JSX.Element;
