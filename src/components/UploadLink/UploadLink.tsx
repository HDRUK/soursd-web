"use client";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Link, LinkProps, Typography } from "@mui/material";

interface UploadLinkProps {
  maxSize: string;
  linkProps: LinkProps;
  onUpload: () => void;
  fileName?: string;
  fileNamePlaceholder?: string;
}

export default function UploadLink({
  fileName,
  fileNamePlaceholder,
  maxSize,
  linkProps,
  onUpload,
}: UploadLinkProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        variant="contained"
        onClick={onUpload}
        title={fileNamePlaceholder}>
        {fileName ? <EditIcon /> : <UploadFileIcon />}
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
