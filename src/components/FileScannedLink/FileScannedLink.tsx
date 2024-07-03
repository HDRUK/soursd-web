"use client";

import FileLink from "@/components/FileLink";
import { MessageInline } from "@/components/Message";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Box, CircularProgress } from "@mui/material";
import { ChangeEventHandler } from "react";

export interface CVDetailsProps {
  fileName: string;
  href: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  isUploading?: boolean;
  isSizeTooBig?: boolean;
  isScanning?: boolean;
  isOk?: boolean;
  messages: {
    fileScanning: string;
    fileScanOk: string;
    fileScanError: string;
    fileInputLabel: string;
    fileDownload: string;
    fileButtonUpload: string;
    fileMaxSize: string;
    fileMaxSizeError: string;
  };
}

export default function FileScannedLink({
  href,
  onFileChange,
  isUploading,
  fileName,
  isSizeTooBig,
  isScanning,
  isOk,
  messages,
}: CVDetailsProps) {
  const {
    fileScanning,
    fileScanOk,
    fileScanError,
    fileMaxSizeError,
    fileInputLabel,
    fileDownload,
    fileButtonUpload,
    fileMaxSize,
  } = messages;

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FileLink
        isLoading={isUploading}
        fileName={fileName}
        statusIcons={
          <>
            {isOk && !isScanning && (
              <GppGoodIcon
                color="success"
                titleAccess={fileScanOk}
                fontSize="small"
              />
            )}
            {!isOk && !isScanning && (
              <GppBadIcon
                color="error"
                titleAccess={fileScanError}
                fontSize="small"
              />
            )}
            {isScanning && (
              <CircularProgress color="info" size="1em" title={fileScanning} />
            )}
          </>
        }
        href={href}
        maxSizeLabel={fileMaxSize}
        linkProps={{
          title: fileDownload,
        }}
        iconButtonProps={{
          "aria-label": fileButtonUpload,
        }}
        inputProps={{
          "aria-label": fileInputLabel,
        }}
        onFileChange={onFileChange}
        disabledDownload={!isScanning}
      />
      {isSizeTooBig && !isScanning && (
        <div>
          <MessageInline color="error">{fileMaxSizeError}</MessageInline>
        </div>
      )}
    </Box>
  );
}
