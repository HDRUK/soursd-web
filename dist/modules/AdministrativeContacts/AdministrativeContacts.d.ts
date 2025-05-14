import { TableProps } from "@/components/Table";
import { CustodianUser } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
interface AdministrativeContactsProps extends TableProps<CustodianUser> {
    tKey?: string;
    additionalColumns?: ColumnDef<CustodianUser>[];
}
export default function AdministrativeContacts({ tKey, columns, additionalColumns, ...restProps }: AdministrativeContactsProps): import("react/jsx-runtime").JSX.Element;
export {};
