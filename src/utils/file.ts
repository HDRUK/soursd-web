import { FileStatus, FileType } from "@/consts/files";
import { FileResponse } from "@/services/files/types";
import { ChangeEvent } from "react";

function getLatestCV(files: FileResponse[] | undefined) {
  return [...(files || [])].reverse().find(file => file.type === FileType.CV);
}

function getUploadedCertification(files: FileResponse[] | undefined) {
  return [...(files || [])]
    .reverse()
    .find(file => file.type === FileType.CERTIFICATION);
}

function isFileScanning(file: FileResponse | undefined) {
  return file?.status === FileStatus.PENDING;
}

function isFileScanComplete(file: FileResponse | undefined) {
  return file?.status === FileStatus.PROCESSED;
}

function isFileScanFailed(file: FileResponse | undefined) {
  return file?.status === FileStatus.FAILED;
}

function getFileHref(fileName: string | undefined) {
  if (!fileName) return "";

  return `${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL}/${fileName}`;
}

function getFileExtension(file: File) {
  return file.name.match(/[^.]*$/)?.[0]?.toLowerCase();
}

const getFileFromEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target.files && target?.files?.length) {
    return target.files[0];
  }

  return null;
};

export {
  getFileExtension,
  getFileFromEvent,
  getFileHref,
  getLatestCV,
  getUploadedCertification,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
};
