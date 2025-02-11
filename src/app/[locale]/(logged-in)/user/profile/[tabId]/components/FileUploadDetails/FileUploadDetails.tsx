"use client";

import FileLink, { FileLinkProps } from "@/components/FileLink";
import { FileType, MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { FileUploadState } from "@/hooks/useFileUpload";
import { getFileHref } from "@/utils/file";
import { useTranslations } from "next-intl";
import prettyBytes from "pretty-bytes";
import { ChangeEventHandler } from "react";

export interface FileUploadDetailsProps extends FileLinkProps {
  fileType: FileType;
}

export default function FileUploadDetails({
  fileType = FileType.CV,
  ...fileLinkProps
}: FileUploadDetailsProps) {
  const t = useTranslations(fileType === FileType.CV ? "Cv" : "Certification");

  return (
    <FileLink
      {...fileLinkProps}
      fileButtonText={t("fileDownload")}
      fileInputLabelText={t("fileInputLabel")}
      fileScanErrorText={t("fileScanError")}
      fileScanningText={t("fileScanning")}
      fileScanOkText={t("fileScanOk")}
      canDownload
    />
  );
}
