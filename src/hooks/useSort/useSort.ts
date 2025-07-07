import { getSearchSortOrder, getSearchSortParam } from "@/utils/query";
import { ReactNode, useMemo } from "react";
import { SearchDirections } from "../../consts/search";
import { SearchParams } from "../../types/query";

interface UseSortProps {
  items: {
    label: ReactNode;
    key: string;
    sortDirection?: SearchDirections;
    type?: "string" | "number";
  }[];
  queryParams: SearchParams;
  onSort: (key: string, direction: string) => void;
}

export default function useSort(options: UseSortProps) {
  const { items, onSort, queryParams } = options;
  const queryParamsSortDirection = getSearchSortOrder(queryParams);
  const queryParamsSortParam = getSearchSortParam(queryParams);

  const getTypeSuffix = (
    type: "string" | "number",
    sortDirection: SearchDirections
  ) => {
    let typeSuffix = "";

    if (type === "number") {
      if (sortDirection === SearchDirections.ASC) {
        typeSuffix = "0-9";
      } else {
        typeSuffix = "9-0";
      }
    } else if (sortDirection === SearchDirections.ASC) {
      typeSuffix = "A-Z";
    } else {
      typeSuffix = "Z-A";
    }

    return typeSuffix;
  };

  const actions = useMemo(
    () =>
      items.map(
        ({
          label,
          key,
          sortDirection = SearchDirections.ASC,
          type = "string",
        }) => {
          let toggledSortDirection = sortDirection;

          if (queryParamsSortParam === key) {
            toggledSortDirection =
              queryParamsSortDirection === SearchDirections.ASC
                ? SearchDirections.DESC
                : SearchDirections.ASC;
          }

          return {
            label: `${label} (${getTypeSuffix(type, toggledSortDirection)})`,
            onClick: () => {
              onSort(key, toggledSortDirection);
            },
          };
        }
      ),
    [queryParamsSortParam, queryParamsSortDirection, items]
  );

  return {
    actions,
  };
}
