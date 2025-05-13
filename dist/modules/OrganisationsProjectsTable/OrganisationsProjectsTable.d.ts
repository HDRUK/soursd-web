import { TableProps } from "@/components/Table";
import { Organisation } from "@/types/application";
interface OrganisationsProjectsTableProps extends Omit<TableProps<Organisation>, "columns"> {
    columns?: TableProps<Organisation>["columns"];
    tKey?: string;
}
export default function OrganisationsProjectsTable({ tKey, columns, ...restProps }: OrganisationsProjectsTableProps): import("react/jsx-runtime").JSX.Element;
export {};
