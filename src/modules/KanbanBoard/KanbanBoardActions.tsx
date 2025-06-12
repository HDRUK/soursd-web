import { Box, Button, MenuItem, Select } from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import {
  ActionMenu,
  ActionMenuHelpers,
  ActionMenuItem,
  ActionMenuProps,
} from "../../components/ActionMenu";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface KanbanBoardActionsMenuProps
  extends Omit<ActionMenuProps, "children"> {
  columns: string[];
  onMoveClick: (
    e: MouseEvent<HTMLButtonElement>,
    containerId: UniqueIdentifier
  ) => void;
}

export default function KanbanBoardActionsMenu({
  columns,
  onMoveClick,
  ...restProps
}: KanbanBoardActionsMenuProps) {
  const [status, setStatus] = useState<string>("");

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

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
              <Select
                sx={{ minWidth: 200 }}
                value={status}
                onChange={handleStatusChange}>
                {columns.map(key => (
                  <MenuItem value={key}>{key}</MenuItem>
                ))}
              </Select>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={e => onMoveClick(e, status)}>Confirm</Button>
            </Box>
          }>
          Move to
        </ActionMenuItem>
      ),
    [columns, status]
  );

  return <ActionMenu {...restProps}>{actions}</ActionMenu>;
}
