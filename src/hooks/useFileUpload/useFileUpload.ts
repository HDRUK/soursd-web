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
import { useEffect, useState } from "react";
import useQueryAlerts from "../useQueryAlerts";
import useQueryRefetch from "../useQueryRefetch";

export interface FileUploadState {
  isScanning: boolean;
  isScanComplete: boolean;
  isScanFailed: boolean;
  message: string;
}

export default function useFileUpload(message: string) {
  const [file, setFile] = useState<ApplicationFile>();
  const [isSizeInvalid, setIsSizeInvalid] = useState<boolean>();

  const postFileState = useMutation(postFileQuery(message));
  const getFileState = useQuery(getFileQuery(file?.id));

  const { refetch: refetchFile, cancel: refetchFileCancel } = useQueryRefetch({
    options: { queryKey: ["getFile", file?.id] },
  });

  useQueryAlerts(postFileState, {
    commonAlertProps: {
      willClose: () => {
        postFileState.reset();
      },
    },
  });

  const upload = async (formData: FormData) => {
    setIsSizeInvalid(false);

    const file = formData.get("file") as File;

    if (file.size <= MAX_UPLOAD_SIZE_BYTES) {
      const { data } = await postFileState.mutateAsync(formData);

      setFile(data);

      return data;
    }

    setIsSizeInvalid(true);

    return null;
  };

  const fileData = getFileState.data?.data;

  useEffect(() => {
    if (file?.id && (!fileData || isFileScanning(fileData))) {
      refetchFile();
    } else {
      refetchFileCancel();
    }

    return () => {
      refetchFileCancel();
    };
  }, [file?.id, fileData]);

  return {
    upload,
    isScanning: isFileScanning(fileData),
    isScanComplete: isFileScanComplete(fileData),
    isScanFailed: isFileScanFailed(fileData),
    isSizeInvalid,
    isUploading: getFileState.isLoading,
    fileHref: getFileHref(file?.name),
    file,
  };
}
