import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import getFileQuery from "@/services/files/getFileQuery";
import postFileQuery from "@/services/files/postFileQuery";
import { File as ApplicationFile } from "@/types/application";
import {
  getFileHref,
  isFileScanComplete,
  isFileScanFailed,
  isFileScanning,
} from "@/utils/file";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import useQueryAlerts from "../useQueryAlerts";
import useQueryRefetch from "../useQueryRefetch";

export interface FileUploadState {
  isScanning: boolean;
  isScanComplete: boolean;
  isScanFailed: boolean;
  message: string;
  initialFileId?: number;
}

export default function useFileUpload(message: string, initialFileId?: number) {
  const [file, setFile] = useState<ApplicationFile>();
  const [isSizeInvalid, setIsSizeInvalid] = useState<boolean>();

  const postFileState = useMutation(postFileQuery(message));

  const fileId = file?.id || initialFileId;
  const { data: fileData, isLoading } = useQuery({
    ...getFileQuery(fileId),
    queryKey: [`getFile${message}`, fileId],
    enabled: !!fileId,
  });
  const { refetch: refetchFile, cancel: refetchFileCancel } = useQueryRefetch({
    options: { queryKey: [`getFile${message}`, fileId] },
  });

  useQueryAlerts(postFileState, {
    commonAlertProps: {
      willClose: () => {
        postFileState.reset();
      },
    },
  });

  const upload = useCallback(
    async (formData: FormData) => {
      setIsSizeInvalid(false);

      const file = formData.get("file") as File;

      if (file.size <= MAX_UPLOAD_SIZE_BYTES) {
        const { data } = await postFileState.mutateAsync(formData);
        setFile(data);
        return data;
      }

      setIsSizeInvalid(true);
      return null;
    },
    [postFileState]
  );

  useEffect(() => {
    if (initialFileId && fileData?.data) {
      setFile(fileData.data);
    }
  }, [initialFileId, fileData]);

  useEffect(() => {
    if (fileId && (!fileData?.data || isFileScanning(fileData.data))) {
      refetchFile();
    } else {
      refetchFileCancel();
    }

    return () => {
      refetchFileCancel();
    };
  }, [fileId, fileData, refetchFile, refetchFileCancel]);

  return {
    upload,
    isScanning: isFileScanning(fileData?.data),
    isScanComplete: isFileScanComplete(fileData?.data),
    isScanFailed: isFileScanFailed(fileData?.data),
    isSizeInvalid,
    isUploading: isLoading,
    fileHref: getFileHref(file),
    file,
  };
}
