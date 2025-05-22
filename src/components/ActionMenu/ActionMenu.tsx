import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuList, Box, BoxProps } from "@mui/material";
import { ReactNode, useState } from "react";

interface ActionMenuProps extends BoxProps {
  children: ReactNode;
  onOpen?(): void;
  onClose?(): void;
  trigger?: ReactNode;
  icon?: ReactNode;
}

export default function ActionMenu({
  children,
  onOpen,
  onClose,
  trigger,
  icon = <MoreVertIcon />,
  ...restProps
}: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { ["aria-label"]: ariaLabel, ...additionalProps } = restProps;

  const handleOpen = ({ currentTarget }: React.UIEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <Box component="span" {...additionalProps}>
      {!trigger && (
        <IconButton size="small" onClick={handleOpen} aria-label={ariaLabel}>
          {icon}
        </IconButton>
      )}

      {trigger && (
        <span
          onClick={handleOpen}
          onKeyDown={handleOpen}
          role="button"
          tabIndex={0}
          aria-label={ariaLabel}>
          {trigger}
        </span>
      )}
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuList dense>{children}</MenuList>
      </Menu>
    </Box>
  );
}
