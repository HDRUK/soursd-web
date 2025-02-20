import React, { ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Pagination from "@/components/Pagination";
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Box,
  CircularProgress,
} from "@mui/material";
import { Message } from "@/components/Message";
import { QueryState } from "@/types/form";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPaginated?: boolean;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  last_page?: number;
  dense?: boolean;
  queryState: QueryState;
  errorMessage?: ReactNode;
}

const Table = <T,>({
  data,
  columns,
  isPaginated = false,
  page,
  setPage,
  last_page,
  queryState,
  dense = true,
  errorMessage = "error",
}: TableProps<T>) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
  });

  const { isLoading, isError } = queryState;

  if (!isLoading && isError) {
    return <Message severity="error">{errorMessage}</Message>;
  }

  return (
    <>
      <TableContainer sx={{ my: 1 }}>
        <MuiTable size={dense ? "small" : "medium"}>
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
      {isLoading && (
        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {isPaginated && page && setPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Pagination
            count={last_page}
            page={page}
            onChange={(e: React.ChangeEvent<unknown>, page: number) => {
              setPage(page);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Table;
