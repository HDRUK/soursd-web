import React, { useState, useEffect, ChangeEvent } from "react";
import { TextFieldProps } from "@mui/material/TextField";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { IconButton, Menu, MenuItem, Button } from "@mui/material";
import { ActionMenu, ActionMenuItem } from "../ActionMenu";

interface Action {
  label: string;
  onClick: () => void;
}

type SortButtonProps = TextFieldProps & {
  actions: Action[];
};

const SortButton = ({ actions }: SortButtonProps) => {
  return (
    <ActionMenu icon={<SortByAlphaIcon />} style={{ margin: "auto" }}>
      {actions?.map(action => (
        <ActionMenuItem onClick={action.onClick}>
          {action.label}{" "}
        </ActionMenuItem>
      ))}
    </ActionMenu>
  );
};
export default SortButton;
