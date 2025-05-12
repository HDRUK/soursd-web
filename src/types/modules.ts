import { TableProps } from "@/components/Table";

export interface ModuleTables<T = unknown, P = unknown>
  extends Omit<TableProps<T>, "columns"> {
  includeColumns: P[];
  t: (key: string) => string;
  extraColumns?: TableProps<T>["columns"];
}
