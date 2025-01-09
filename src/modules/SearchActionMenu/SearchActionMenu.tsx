import React, { ReactNode } from "react";
import { TextFieldProps } from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox, Box } from "@mui/material";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";

export interface Action {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  checked: boolean;
}

type SortButtonProps = TextFieldProps & {
  actions: Action[];
};

const SearchActionMenu = ({ actions, sx }: SortButtonProps) => {
  return (
    <Box sx={sx}>
      <ActionMenu icon={<FilterAltIcon />} aria-label="search-action-menu">
        {actions?.map(action => (
          <ActionMenuItem key={action.label} onClick={action.onClick}>
            <Checkbox
              checked={action.checked}
              inputProps={{ "aria-label": `checkbox-${action.label}` }}
            />
            {action?.icon} {action.label}
          </ActionMenuItem>
        ))}
      </ActionMenu>
    </Box>
  );
};
export default SearchActionMenu;
