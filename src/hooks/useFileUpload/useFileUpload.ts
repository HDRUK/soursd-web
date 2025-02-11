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
import { ChangeEvent, useEffect, useState } from "react";
import useQueryRefetch from "../useQueryRefetch";

export interface FileUploadState {
  isScanning: boolean;
  isScanComplete: boolean;
  isScanFailed: boolean;
}

export default function useFileUpload() {
  const [file, setFile] = useState<ApplicationFile>();
  const [isSizeInvalid, setIsSizeInvalid] = useState<boolean>();

  const postFileState = useMutation(postFileQuery());
  const getFileState = useQuery(getFileQuery(file?.id));

  const { refetch: refetchFile, cancel: refetchFileCancel } = useQueryRefetch({
    options: { queryKey: ["getFile", file?.id] },
  });

  const upload = async (formData: FormData) => {
    setIsSizeInvalid(false);

    const file = formData.get("file") as File;

    if (file.size <= MAX_UPLOAD_SIZE_BYTES) {
      const { data } = await postFileState.mutateAsync(formData);

      setFile(data);

      return data;
    } else {
      setIsSizeInvalid(true);
    }

    return;
  };

  useEffect(() => {
    if (file?.id) {
      refetchFile();
    } else {
      refetchFileCancel();
    }

    return () => {
      refetchFileCancel();
    };
  }, [file?.id]);

  return {
    upload,
    isScanning: isFileScanning(file),
    isScanComplete: isFileScanComplete(file),
    isScanFailed: isFileScanFailed(file),
    isSizeInvalid,
    isUploading: getFileState.isLoading,
    fileHref: getFileHref(file?.name),
    file,
    getFileFromEvent,
  };
}
