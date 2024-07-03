"use client";

import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  CircularProgress,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChangeEventHandler,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
} from "react";

export interface FileLinkProps {
  maxSizeLabel: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  disabledDownload?: boolean;
  actions?: ReactNode;
  isLoading?: boolean;
  href?: string;
  fileName?: ReactNode;
  fileNamePlaceholder?: string;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  iconButtonProps?: IconButtonProps;
  linkProps?: LinkProps;
  statusIcons?: ReactNode;
}

export default function FileLink({
  fileName,
  fileNamePlaceholder,
  href,
  maxSizeLabel,
  linkProps,
  iconButtonProps,
  inputProps,
  isLoading,
  actions,
  statusIcons,
  disabledDownload,
  onFileChange,
}: FileLinkProps) {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);

  let buttonIcon = <UploadFileIcon />;

  const handleFileSelectorOpen = useCallback(() => {
    ref.current?.click();
  }, []);

  if (isLoading) {
    buttonIcon = (
      <CircularProgress size="24px" data-testid="UploadLink-loader" />
    );
  } else if (fileName) {
    buttonIcon = <EditIcon />;
  }

  const getContentStyles = () => {
    if (!isLoading) return null;

    return {
      color: theme.palette.inactive.main,
      ["svg"]: {
        color: theme.palette.inactive.main,
      },
    };
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        variant="contained"
        onClick={handleFileSelectorOpen}
        title={fileNamePlaceholder}
        {...iconButtonProps}>
        {buttonIcon}
      </IconButton>
      <div>
        <Typography
          sx={{
            display: "flex",
            ...getContentStyles(),
          }}>
          {fileName || fileNamePlaceholder}
          {statusIcons && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                ml: 0.5,
              }}>
              {statusIcons}
            </Box>
          )}
        </Typography>
        <Typography
          variant="caption"
          color="caption.main"
          sx={{ display: "block" }}>
          {maxSizeLabel}
        </Typography>
      </div>
      <Box sx={{ display: "flex", gap: 1, height: "1.5rem" }}>
        {fileName && !isLoading && disabledDownload && (
          <Link sx={{ color: "#000" }} href={href} {...linkProps}>
            <DownloadIcon />
          </Link>
        )}
        {actions}
      </Box>
      <input
        aria-label="File upload input"
        id="fileInput"
        {...inputProps}
        type="file"
        style={{ display: "none" }}
        ref={ref}
        onChange={onFileChange}
      />
    </Box>
  );
}
