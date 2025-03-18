import { FileStatus, FileType } from "@/consts/files";
import { File } from "@/types/application";
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

function getFileHref(file: File | undefined) {
  if (!file) return "";
  const path = `${process.env.NEXT_PUBLIC_API_V1_URL}/files`;
  return `${path}/${file.id}/download`;
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

const resetFileFromEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
  if (target && target.files && target.files.length > 0) {
    console.log("here i am");
    target.value = "";
  }
};

export {
  getFileExtension,
  getFileFromEvent,
  getFileHref,
  getLatestCV,
  getUploadedCertification,
  resetFileFromEvent,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
};
