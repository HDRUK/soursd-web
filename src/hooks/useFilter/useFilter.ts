import { ReactNode, useMemo } from "react";
import { SearchParams } from "../../types/query";

interface UseFilterProps {
  items: {
    label: ReactNode;
    key: string;
    value: string;
  }[];
  queryParams: SearchParams;
  onFilter: (key: string, value: string) => void;
}

export default function useFilter(options: UseFilterProps) {
  const { items, onFilter, queryParams } = options;

  const actions = useMemo(
    () =>
      items.map(({ label, key, value }) => {
        return {
          label,
          checked: queryParams[key] === value,
          onClick: () => {
            onFilter(key, value);
          },
        };
      }),
    [items]
  );

  return {
    actions,
  };
}
