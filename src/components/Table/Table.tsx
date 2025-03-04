import Pagination from "@/components/Pagination";
import { QueryState } from "@/types/form";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { ReactNode } from "react";
import Results from "../Results";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPaginated?: boolean;
  showHeader?: boolean;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  last_page?: number;
  dense?: boolean;
  queryState: QueryState;
  errorMessage?: ReactNode;
  noResultsMessage?: ReactNode;
  total?: number;
}

const Table = <T,>({
  data,
  columns,
  isPaginated = false,
  showHeader = true,
  page,
  setPage,
  last_page,
  queryState,
  dense = true,
  errorMessage = "Error",
  noResultsMessage = "No results",
  total,
}: TableProps<T>) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
  });

  return (
    <Results
      total={total}
      queryState={queryState}
      noResultsMessage={noResultsMessage}
      errorMessage={errorMessage}
      pagination={
        isPaginated && (
          <Pagination
            count={last_page}
            page={page}
            onChange={(e: React.ChangeEvent<unknown>, page: number) => {
              setPage?.(page);
            }}
          />
        )
      }>
      <TableContainer sx={{ my: 1 }}>
        <MuiTable size={dense ? "small" : "medium"}>
          {showHeader && (
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          )}

          <TableBody>
            {table?.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Results>
  );
};

export default Table;
