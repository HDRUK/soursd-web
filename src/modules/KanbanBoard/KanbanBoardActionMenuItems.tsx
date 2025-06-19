import { Box, Button, MenuItem, Select } from "@mui/material";
import { useMemo, useState } from "react";
import {
  ActionMenuHelpers,
  ActionMenuItem,
  ActionMenuProps,
} from "../../components/ActionMenu";
import { WithTranslations } from "../../types/application";
import { KanbanBoardHelperProps } from "./KanbanBoard";

export type KanbanBoardActionsMenuItemsProps = WithTranslations<
  Omit<ActionMenuProps, "children">
> &
  KanbanBoardHelperProps &
  Pick<ActionMenuHelpers, "handleClose">;

export default function KanbanBoardActionsMenuItems({
  t,
  allowedColumns,
  onMoveClick,
  handleClose,
}: KanbanBoardActionsMenuItemsProps) {
  const [status, setStatus] = useState<string>("");

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  return (
    <>
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
              {allowedColumns.map(key => (
                <MenuItem value={key}>{t(key)}</MenuItem>
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
    </>
  );
}
