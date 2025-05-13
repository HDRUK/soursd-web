import { QueryState } from "@/types/form";
import { BoxProps } from "@mui/material";
import { ReactNode } from "react";
interface ResultsProps extends BoxProps {
    queryState: QueryState;
    noResultsMessage: ReactNode;
    errorMessage: ReactNode;
    total: number | undefined;
    pagination?: ReactNode;
}
export default function Results({ queryState, noResultsMessage, errorMessage, children, total, pagination, ...restProps }: ResultsProps): import("react/jsx-runtime").JSX.Element;
export {};
