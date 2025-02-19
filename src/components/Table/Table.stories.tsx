import type { Meta, StoryObj } from "@storybook/react";
import { QueryState } from "@/types/form";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Select } from "@mui/material";
import Table from "./Table";

interface Data {
  id: number;
  name: string;
}

const meta: Meta<typeof Table<Data>> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => getValue<number>(),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => getValue<string>(),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <Box>
        <Select />
      </Box>
    ),
  },
];

const data: Data[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const loadingState: QueryState = { isLoading: true, isError: false };
const errorState: QueryState = { isLoading: false, isError: true };
const successState: QueryState = { isLoading: false, isError: false };

export const Basic: Story = {
  args: {
    data,
    columns,
    queryState: successState,
  },
};

export const Paginated: Story = {
  args: {
    data,
    columns,
    isPaginated: true,
    page: 1,
    setPage: () => {},
    last_page: 3,
    queryState: successState,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    queryState: loadingState,
  },
};

export const Error: Story = {
  args: {
    data: [],
    columns,
    queryState: errorState,
    errorMessage: "Failed to load data",
  },
};
