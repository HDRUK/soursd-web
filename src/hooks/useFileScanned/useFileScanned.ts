import { FileResponse } from "@/services/files/types";
import {
  isFileScanFailed,
  isFileScanComplete,
  isFileScanning,
} from "@/utils/file";
import { useEffect, useState } from "react";

export default function useFileScanned(file: FileResponse | undefined) {
  const [isNotInfected, setIsNotInfected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const setFileStatus = () => {
    if (isFileScanComplete(file)) {
      setIsScanning(false);
      setIsNotInfected(isFileScanComplete(file));
    } else if (isFileScanFailed(file)) {
      setIsScanning(false);
      setIsNotInfected(false);
    } else if (isFileScanning(file)) {
      setIsScanning(true);
    }
  };

  useEffect(() => {
    setFileStatus();
  }, [file?.status]);

  useEffect(() => {
    setFileStatus();
  }, []);

  return { isNotInfected, isScanning };
}
