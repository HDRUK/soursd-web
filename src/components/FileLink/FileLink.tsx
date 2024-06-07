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
} from "@mui/material";
import { ChangeEventHandler, HTMLAttributes, useCallback, useRef } from "react";

export interface FileLinkProps {
  maxSizeLabel: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  isLoading?: boolean;
  href?: string;
  fileName?: string;
  fileNamePlaceholder?: string;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  iconButtonProps?: IconButtonProps;
  linkProps?: LinkProps;
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
  onFileChange,
}: FileLinkProps) {
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
        <Typography>
          {fileName || fileNamePlaceholder}
          <Typography
            variant="caption"
            color="caption.main"
            sx={{ display: "block" }}>
            {maxSizeLabel}
          </Typography>
        </Typography>
      </div>
      {fileName && (
        <div>
          <Link sx={{ color: "#000" }} href={href} {...linkProps}>
            <DownloadIcon />
          </Link>
        </div>
      )}
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
