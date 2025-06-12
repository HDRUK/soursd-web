import { Box, Button, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";
import {
  ActionMenu,
  ActionMenuHelpers,
  ActionMenuItem,
  ActionMenuProps,
} from "../../components/ActionMenu";

export interface KanbanBoardActionsMenuProps
  extends Omit<ActionMenuProps, "children"> {
  columns: string[];
}

export default function KanbanBoardActionsMenu({
  columns,
  ...restProps
}: KanbanBoardActionsMenuProps) {
  const actions = useMemo(
    () =>
      ({ handleClose }: ActionMenuHelpers) => (
        <ActionMenuItem
          collapseContent={
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}>
              <Select sx={{ minWidth: 200 }} value="">
                {columns.map(key => (
                  <MenuItem>{key}</MenuItem>
                ))}
              </Select>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button>Confirm</Button>
            </Box>
          }>
          Move to
        </ActionMenuItem>
      ),
    [columns]
  );

  return <ActionMenu {...restProps}>{actions}</ActionMenu>;
}
