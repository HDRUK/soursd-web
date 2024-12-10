import React, { ReactNode } from "react";
import { TextFieldProps } from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox } from "@mui/material";
import { ActionMenu, ActionMenuItem } from "../ActionMenu";

interface Action {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  checked: boolean;
}

type SortButtonProps = TextFieldProps & {
  actions: Action[];
};

const SortButton = ({ actions }: SortButtonProps) => {
  return (
    <ActionMenu icon={<FilterAltIcon />} style={{ margin: "auto" }}>
      {actions?.map(action => (
        <ActionMenuItem key={action.label} onClick={action.onClick}>
          <Checkbox checked={action.checked} /> {action?.icon} {action.label}
        </ActionMenuItem>
      ))}
    </ActionMenu>
  );
};
export default SortButton;
