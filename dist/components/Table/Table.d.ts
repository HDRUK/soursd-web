import { QueryState } from "@/types/form";
import { ColumnDef, TableOptions } from "@tanstack/react-table";
import React, { ReactNode } from "react";
export interface TableProps<T> extends Partial<TableOptions<T>> {
    data: T[];
    columns: ColumnDef<T>[];
    isPaginated?: boolean;
    isExpandable?: boolean;
    showHeader?: boolean;
    page?: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    last_page?: number;
    dense?: boolean;
    queryState: QueryState;
    errorMessage?: ReactNode;
    noResultsMessage?: ReactNode;
    total?: number;
    sx?: React.CSSProperties;
}
declare const Table: <T>({ data, columns, isPaginated, showHeader, page, setPage, last_page, queryState, dense, errorMessage, noResultsMessage, total, sx, ...restProps }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
