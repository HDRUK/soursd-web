import { BoxProps } from "@mui/material";
import { SectionHeadingProps } from "../SectionHeading";
export type FormSectionProps = BoxProps & SectionHeadingProps;
export default function FormSection({ children, heading, description, ...restProps }: FormSectionProps): import("react/jsx-runtime").JSX.Element;
