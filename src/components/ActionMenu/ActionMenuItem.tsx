import {
  Collapse,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { ReactNode, useState } from "react";

interface ActionMenuItemProps extends MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  collapseContent?: ReactNode;
}

export default function ActionMenuItem({
  children,
  icon,
  collapseContent,
  sx,
  ...restProps
}: ActionMenuItemProps) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  let menuItemSx = sx;

  if (collapseOpen) {
    menuItemSx = {
      ...menuItemSx,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 1,
    };
  }

  return (
    <MenuItem {...restProps} sx={menuItemSx}>
      <div>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          onClick={() => {
            if (collapseContent) {
              setCollapseOpen(!collapseOpen);
            }
          }}>
          {children}
        </ListItemText>
      </div>
      {collapseContent && (
        <Collapse component="div" in={collapseOpen}>
          {collapseContent}
        </Collapse>
      )}
    </MenuItem>
  );
}
