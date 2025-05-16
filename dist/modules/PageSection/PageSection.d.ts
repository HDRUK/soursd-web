import { SectionHeadingProps } from "../components/SectionHeading";
import { BoxProps } from "@mui/material";
type PageSectionProps = BoxProps & SectionHeadingProps;
export default function PageSection({ children, heading, description, sx, ...restProps }: PageSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
