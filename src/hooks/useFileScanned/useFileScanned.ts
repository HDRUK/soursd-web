import { FileResponse } from "@/services/files/types";
import {
  isFileInfected,
  isFileNotInfected,
  isFileScanning,
} from "@/utils/file";
import { useEffect, useState } from "react";

export default function useFileScanned(file: FileResponse | undefined) {
  const [isNotInfected, setIsNotInfected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const setFileStatus = () => {
    if (isFileNotInfected(file)) {
      setIsScanning(false);
      setIsNotInfected(isFileNotInfected(file));
    } else if (isFileInfected(file)) {
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
