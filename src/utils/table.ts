import { ColumnDef } from "@tanstack/react-table";

function filterColumns<T, P>(
  initialColumns: ColumnDef<T, P>[],
  includeColumns: string[],
  extraColumns?: ColumnDef<T, P>[]
) {
  return initialColumns
    .filter(({ id }) => (id ? includeColumns.includes(id) : true))
    .concat(extraColumns || []);
}

export { filterColumns };
