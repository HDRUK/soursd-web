import { File as ApplicationFile } from "@/types/application";
export interface FileUploadState {
    isScanning: boolean;
    isScanComplete: boolean;
    isScanFailed: boolean;
    message: string;
}
interface UseFileUploadOptions {
    initialFileId?: number;
}
export default function useFileUpload(message: string, options?: UseFileUploadOptions): {
    upload: (formData: FormData) => Promise<ApplicationFile | null>;
    isScanning: boolean;
    isScanComplete: boolean;
    isScanFailed: boolean;
    isSizeInvalid: boolean | undefined;
    isUploading: boolean;
    fileHref: string;
    file: ApplicationFile | undefined;
};
export {};
