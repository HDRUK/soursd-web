import { SectionHeadingProps } from "../components/SectionHeading";
import { BoxProps } from "@mui/material";
type PageBodyContainerProps = BoxProps & SectionHeadingProps;
export default function PageBodyContainer({ children, heading, description, ...restProps }: PageBodyContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
