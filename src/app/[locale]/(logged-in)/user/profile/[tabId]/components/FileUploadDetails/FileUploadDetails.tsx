"use client";

import FileScannedLink from "@/components/FileScannedLink";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { useTranslations } from "next-intl";
import { ChangeEventHandler } from "react";
import prettyBytes from "pretty-bytes";
import { getFileHref } from "@/utils/file";

export interface FileUploadDetailsProps {
  fileName: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  isFileUploading?: boolean;
  isFileSizeTooBig?: boolean;
  isFileScanning?: boolean;
  isFileOk?: boolean;
  fileType: "cv" | "certification";
}

export default function FileUploadDetails({
  fileName,
  onFileChange,
  isFileUploading,
  isFileSizeTooBig,
  isFileScanning,
  isFileOk,
  fileType = "cv",
}: FileUploadDetailsProps) {
  const t = useTranslations(fileType === "cv" ? "Cv" : "Certification");
  const translationsMaxSize = {
    size: prettyBytes(MAX_UPLOAD_SIZE_BYTES),
  };

  return (
    <FileScannedLink
      fileName={fileName}
      href={getFileHref(fileName)}
      isUploading={isFileUploading}
      isScanning={isFileScanning}
      isOk={isFileOk}
      isSizeTooBig={isFileSizeTooBig}
      onFileChange={onFileChange}
      messages={{
        fileButtonUpload: t("fileButtonUpload"),
        fileDownload: t("fileDownload"),
        fileInputLabel: t("fileInputLabel"),
        fileMaxSize: t("fileMaxSize", translationsMaxSize),
        fileMaxSizeError: t("fileMaxSizeError", translationsMaxSize),
        fileScanError: t("fileScanError"),
        fileScanning: t("fileScanning"),
        fileScanOk: t("fileScanOk"),
      }}
    />
  );
}
