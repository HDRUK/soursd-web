import { FileStatus, FileType } from "@/consts/files";
import { FileResponse } from "@/services/files/types";

function getLatestCV(files: FileResponse[] | undefined) {
  return [...(files || [])].reverse().find(file => file.type === FileType.CV);
}

function isFileScanning(file: FileResponse | undefined) {
  return file?.status === FileStatus.PENDING;
}

function isFileNotInfected(file: FileResponse | undefined) {
  return file?.status === FileStatus.PROCESSED;
}

function isFileInfected(file: FileResponse | undefined) {
  return file?.status === FileStatus.FAILED;
}

function getFileHref(fileName: string | undefined) {
  if (!fileName) return "";

  return `${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL}/${fileName}`;
}

export {
  getLatestCV,
  isFileScanning,
  isFileNotInfected,
  isFileInfected,
  getFileHref,
};
