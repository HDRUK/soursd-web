import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { ReactNode } from "react";

interface ActionMenuItemProps extends MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
}

export default function ActionMenuItem({
  children,
  icon,
  ...restProps
}: ActionMenuItemProps) {
  return (
    <MenuItem {...restProps}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
}
