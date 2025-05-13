import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
interface PaginationProps extends MuiPaginationProps {
    isLoading?: boolean;
}
declare const Pagination: ({ isLoading, ...rest }: PaginationProps) => import("react/jsx-runtime").JSX.Element | null;
export default Pagination;
