import { CardProps } from "@mui/material";
export interface QuoteProps extends CardProps {
    profileImage?: string;
    name?: string;
    description?: string;
}
export default function Quote({ children, profileImage, elevation, name, description, ...restProps }: QuoteProps): import("react/jsx-runtime").JSX.Element;
