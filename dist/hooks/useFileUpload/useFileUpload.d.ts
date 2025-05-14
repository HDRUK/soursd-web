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
    upload: (formData: FormData) => Promise<any>;
    isScanning: any;
    isScanComplete: any;
    isScanFailed: any;
    isSizeInvalid: boolean | undefined;
    isUploading: boolean;
    fileHref: any;
    file: any;
};
export {};
