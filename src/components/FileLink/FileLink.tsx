"use client";

import Text from "@/components/Text";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { FileUploadState } from "@/hooks/useFileUpload";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import UploadIcon from "@mui/icons-material/Upload";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Link, Typography, Grid } from "@mui/material";
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
  fileTypesText?: ReactNode;
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
  fileTypesText,
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
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleFileSelectorOpen}
          startIcon={<UploadIcon />}
          loading={isUploading && !isScanning}
          fullWidth
        >
          {fileButtonText}
        </LoadingButton>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="caption" color="caption.main" component="div">
          {fileTypesText || t("fileTypesText")}
        </Typography>
        <Typography variant="caption" color="caption.main" component="div">
          {fileMaxSizeText || t("maxSizeText", translationsMaxSize)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={1} sx={{ textAlign: 'right' }}>
        {!showLink && includeStatus && statusIcons}
      </Grid>
      {isSizeInvalid && (
        <Grid item xs={12}>
          <Typography variant="caption" color="error">
            {fileMaxSizeErrorText || t("maxSizeErrorText", translationsMaxSize)}
          </Typography>
        </Grid>
      )}
      {showLink && (
        <Grid item xs={12}>
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
            }}
          >
            {includeStatus ? (
              <Text endIcon={statusIcons}>{fileNameText}</Text>
            ) : (
              fileNameText
            )}
          </Link>
        </Grid>
      )}
      <input
        id="fileInput"
        type="file"
        aria-label={fileInputLabelText || t("inputLabelText")}
        style={{ display: "none" }}
        ref={ref}
        onChange={onFileChange}
        accept={accept}
      />
    </Grid>
  );
}
