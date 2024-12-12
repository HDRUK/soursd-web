import React, { ReactNode } from "react";
import { TextFieldProps } from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox } from "@mui/material";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";

interface Action {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  checked: boolean;
}

type SortButtonProps = TextFieldProps & {
  actions: Action[];
};

const SearchActionMenu = ({ actions }: SortButtonProps) => {
  return (
    <ActionMenu
      icon={<FilterAltIcon />}
      style={{ margin: "auto" }}
      aria-label="search-action-menu">
      {actions?.map(action => (
        <ActionMenuItem key={action.label} onClick={action.onClick}>
          <Checkbox checked={action.checked} />
          {action?.icon} {action.label}
        </ActionMenuItem>
      ))}
    </ActionMenu>
  );
};
export default SearchActionMenu;
