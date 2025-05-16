"use client";

import { useTranslations } from "next-intl";
import { FileType } from "../../consts/files";
import FileLink, { FileLinkProps } from "../../components/FileLink";

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
      fileButtonText={t("fileUpload")}
      fileInputLabelText={t("fileInputLabel")}
      fileScanErrorText={t("fileScanError")}
      fileScanningText={t("fileScanning")}
      fileScanOkText={t("fileScanOk")}
      includeStatus
    />
  );
}
