"use client";

import Text from "@/components/Text";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { FileUploadState } from "@/hooks/useFileUpload";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import UploadIcon from "@mui/icons-material/Upload";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import prettyBytes from "pretty-bytes";
import { ChangeEventHandler, ReactNode, useCallback, useRef } from "react";

export interface FileLinkProps extends FileUploadState {
  fileButtonText: ReactNode;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onDownload?: (e: MouseEvent) => void;
  accept?: string;
  fileScanOkText?: string;
  fileScanErrorText?: string;
  fileScanningText?: string;
  fileMaxSizeText?: ReactNode;
  fileMaxSizeErrorText?: ReactNode;
  fileNameText?: ReactNode;
  fileInputLabelText?: string;
  fileHref?: string;
  isUploading?: boolean;
  includeStatus?: boolean;
  isSizeInvalid?: boolean;
  canDownload?: boolean;
  disableDownload?: boolean;
}

const NAMESPACE_TRANSLATION_FILE = "File";

export default function FileLink({
  accept,
  fileScanOkText,
  fileScanErrorText,
  fileScanningText,
  fileButtonText,
  fileMaxSizeText,
  fileMaxSizeErrorText,
  fileNameText,
  fileHref,
  fileInputLabelText,
  isScanning,
  isScanComplete,
  isScanFailed,
  isUploading,
  isSizeInvalid,
  includeStatus,
  canDownload,
  disableDownload,
  onFileChange,
  onDownload,
}: FileLinkProps) {
  const ref = useRef<HTMLInputElement>(null);

  const t = useTranslations(NAMESPACE_TRANSLATION_FILE);

  const translationsMaxSize = {
    size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
  };

  const handleFileSelectorOpen = useCallback(() => {
    ref.current?.click();
  }, []);

  const statusIcons = (
    <>
      {isScanComplete && (
        <GppGoodIcon
          color="success"
          titleAccess={fileScanOkText || t("scanOkText")}
        />
      )}
      {isScanFailed && (
        <GppBadIcon
          color="error"
          titleAccess={fileScanErrorText || t("scanErrorText")}
        />
      )}
      {isScanning && (
        <CircularProgress
          color="info"
          size="1em"
          title={fileScanningText || t("scanningText")}
          role="progressbar"
        />
      )}
    </>
  );

  const showLink = fileNameText && fileHref;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <LoadingButton
          color="primary"
          variant="outlined"
          onClick={handleFileSelectorOpen}
          startIcon={<UploadIcon />}
          loading={isUploading && !isScanning}
          fullWidth>
          {fileButtonText}
        </LoadingButton>
        {!showLink && includeStatus && statusIcons}
      </Box>
      <div>
        {showLink && (
          <Link
            href={fileHref}
            onClick={(e: MouseEvent) =>
              (disableDownload || canDownload) && onDownload?.(e)
            }
            sx={{
              ...((disableDownload || canDownload) && {
                pointerEvents: "none",
                cursor: "default",
              }),
            }}>
            {includeStatus ? (
              <Text endIcon={statusIcons}>{fileNameText}</Text>
            ) : (
              fileNameText
            )}
          </Link>
        )}
        <Typography
          variant="caption"
          color="caption.main"
          sx={{ display: "block" }}>
          {fileMaxSizeText || t("maxSizeText", translationsMaxSize)}
        </Typography>
        {isSizeInvalid &&
          (fileMaxSizeErrorText || t("maxSizeErrorText", translationsMaxSize))}
      </div>
      <input
        id="fileInput"
        type="file"
        aria-label={fileInputLabelText || t("inputLabelText")}
        style={{ display: "none" }}
        ref={ref}
        onChange={onFileChange}
        accept={accept}
      />
    </Box>
  );
}
