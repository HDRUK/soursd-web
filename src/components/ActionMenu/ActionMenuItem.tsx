import {
  Box,
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
  collapseContent?:
    | ReactNode
    | (({
        handleCollapse,
        handleExpand,
      }: {
        handleCollapse: () => void;
        handleExpand: () => void;
      }) => ReactNode);
}

export default function ActionMenuItem({
  children,
  icon,
  collapseContent,
  sx,
  ...restProps
}: ActionMenuItemProps) {
  const [collapseIn, setCollapseIn] = useState(false);

  let menuItemSx = sx;

  if (collapseIn) {
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
      <Box sx={{ display: "flex" }}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          onClick={() => {
            if (collapseContent) {
              setCollapseIn(!collapseIn);
            }
          }}>
          {children}
        </ListItemText>
      </Box>
      {collapseContent && (
        <Collapse component="div" in={collapseIn}>
          {typeof collapseContent === "function"
            ? collapseContent({
                handleCollapse: () => setCollapseIn(false),
                handleExpand: () => setCollapseIn(true),
              })
            : collapseContent}
        </Collapse>
      )}
    </MenuItem>
  );
}
