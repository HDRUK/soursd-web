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
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useStore } from "@/data/store";
import React, { ReactNode } from "react";
import Results from "../Results";

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
  sx,
  ...restProps
}: TableProps<T>) => {
  const perPage = useStore(state => state.getApplication().system.PER_PAGE);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
    ...restProps,
    initialState: {
      pagination: {
        pageSize: +perPage.value,
      },
    },
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
      <TableContainer sx={{ my: 1, ...sx }}>
        <MuiTable size={dense ? "small" : "medium"}>
          {showHeader && (
            <TableHead
              sx={{
                backgroundColor: "neutralGrey.main",
              }}>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      sx={{
                        color: "neutralGrey.contrastText",
                        fontWeight: "600",
                        py: 1,
                        width: "auto",
                        minWidth: header.getSize() !== 150 && header.getSize(),
                      }}>
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
              <TableRow key={row.id} role="row">
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      borderBottom: "neutralGrey.main",
                      py: 1,
                    }}>
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
