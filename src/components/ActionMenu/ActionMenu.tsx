import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { ReactNode, useState } from "react";

interface ActionMenuProps {
  items: ReactNode[];
  onOpen?(): void;
  onClose?(): void;
}

export default function ActionMenu({
  items,
  onOpen,
  onClose,
}: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <span>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuList dense>
          {items.map(item => (
            <MenuItem>
              <ListItemText>{item}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </span>
  );
}
