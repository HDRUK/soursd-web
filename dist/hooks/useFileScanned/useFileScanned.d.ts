import { FileResponse } from "@/services/files/types";
export default function useFileScanned(file: FileResponse | undefined): {
    isNotInfected: boolean;
    isScanning: boolean;
};
