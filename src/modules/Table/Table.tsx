import React from "react";
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
} from "@mui/material";
import { Message } from "@/components/Message";
import { QueryState } from "@/types/form";
import { ReactNode } from "react";
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

  {
    /*<TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
          component="div"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={1}
          page={1}
          slotProps={{
            select: {
              inputProps: { "aria-label": "rows per page" },
              native: true,
            },
          }}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={e => {
            const size = e.target.value ? Number(e.target.value) : 10;
            table.setPageSize(size);
          }}
        />*/
  }
};

export default Table;
