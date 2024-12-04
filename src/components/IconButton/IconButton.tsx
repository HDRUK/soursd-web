import {
  CircularProgress,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

export interface IconButtonProps extends MuiIconButtonProps {
  loading?: boolean;
}

export default function IconButton({
  loading,
  children,
  ...restProps
}: IconButtonProps) {
  return (
    <MuiIconButton>{loading ? <CircularProgress /> : children}</MuiIconButton>
  );
}
