import { TranslationsProps } from "@/types/common";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type UseColumnsProps = TranslationsProps<{}>;

export default function useColumns<T>({ t }: UseColumnsProps) {
  const createDefaultColumn = (
    id: string,
    columnProps: Partial<ColumnDef<T>>
  ): ColumnDef<T> => ({
    id,
    accessorKey: id,
    header: t(id),
    ...columnProps,
  });

  return useMemo(
    () => ({
      createDefaultColumn,
    }),
    []
  );
}
