import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { HTMLAttributes, ReactNode, useState } from "react";

interface ActionMenuProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  onOpen?(): void;
  onClose?(): void;
}

export default function ActionMenu({
  children,
  onOpen,
  onClose,
  ...restProps
}: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { ["aria-label"]: ariaLabel, ...additionalProps } = restProps;

  const handleOpen = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <span {...additionalProps}>
      <IconButton size="small" onClick={handleOpen} aria-label={ariaLabel}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuList dense>{children}</MenuList>
      </Menu>
    </span>
  );
}
