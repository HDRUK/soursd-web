import { ListItemText, MenuItem, MenuItemProps } from "@mui/material";
import { ReactNode } from "react";

interface ActionMenuItemProps extends MenuItemProps {
  children: ReactNode;
}

export default function ActionMenuItem({
  children,
  ...restProps
}: ActionMenuItemProps) {
  return (
    <MenuItem {...restProps}>
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
}
