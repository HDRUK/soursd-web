"use client";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  CircularProgress,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  Typography,
} from "@mui/material";

interface UploadLinkProps {
  maxSize: string;
  linkProps: LinkProps;
  onFileSelectorOpen: () => void;
  isLoading: boolean;
  fileName?: string;
  fileNamePlaceholder?: string;
  iconButtonProps: IconButtonProps;
}

export default function UploadLink({
  fileName,
  fileNamePlaceholder,
  maxSize,
  linkProps,
  iconButtonProps,
  isLoading,
  onFileSelectorOpen,
}: UploadLinkProps) {
  let buttonIcon = <UploadFileIcon />;

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
        onClick={onFileSelectorOpen}
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
            {maxSize}
          </Typography>
        </Typography>
      </div>
      {fileName && (
        <div>
          <Link sx={{ color: "#000" }} {...linkProps}>
            <DownloadIcon />
          </Link>
        </div>
      )}
    </Box>
  );
}
