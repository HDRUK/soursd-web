"use client";

import FileScannedLink from "@/components/FileScannedLink";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { useTranslations } from "next-intl";
import { ChangeEventHandler } from "react";
import prettyBytes from "pretty-bytes";
import { getFileHref } from "@/utils/file";

const NAMESPACE_TRANSLATION_CV = "Cv";

export interface DetailsCVProps {
  fileName: string;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  isFileUploading?: boolean;
  isFileSizeTooBig?: boolean;
  isFileScanning?: boolean;
  isFileOk?: boolean;
}

export default function DetailsCV({
  fileName,
  onFileChange,
  isFileUploading,
  isFileSizeTooBig,
  isFileScanning,
  isFileOk,
}: DetailsCVProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CV);
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
