import { GuidanceProps } from "../components/Guidance";
import { ReactNode } from "react";
interface PageGuidanceProps extends GuidanceProps {
    subTabs?: ReactNode;
    children: ReactNode;
}
export default function PageGuidance({ subTabs, children, ...restProps }: PageGuidanceProps): import("react/jsx-runtime").JSX.Element;
export {};
