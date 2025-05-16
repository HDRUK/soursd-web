import { TableProps } from "../components/Table";
import { User } from "@/types/application";
interface OrganisationsPeopleTableProps extends Omit<TableProps<User>, "columns"> {
    columns?: TableProps<User>["columns"];
    tKey?: string;
}
export default function OrganisationsPeopleTable({ tKey, columns, ...restProps }: OrganisationsPeopleTableProps): import("react/jsx-runtime").JSX.Element;
export {};
