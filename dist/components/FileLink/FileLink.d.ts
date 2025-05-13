import { FileUploadState } from "@/hooks/useFileUpload";
import { ChangeEventHandler, ReactNode } from "react";
export interface FileLinkProps extends FileUploadState {
    fileButtonText: ReactNode;
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    onDownload?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    accept?: string;
    fileScanOkText?: string;
    fileScanErrorText?: string;
    fileScanningText?: string;
    fileMaxSizeText?: ReactNode;
    fileMaxSizeErrorText?: ReactNode;
    fileTypesText?: ReactNode;
    fileNameText?: ReactNode;
    fileInputLabelText?: string;
    isUploading?: boolean;
    includeStatus?: boolean;
    isSizeInvalid?: boolean;
}
export default function FileLink({ accept, fileScanOkText, fileScanErrorText, fileScanningText, fileButtonText, fileMaxSizeText, fileMaxSizeErrorText, fileTypesText, fileNameText, fileInputLabelText, isScanning, isScanComplete, isScanFailed, isUploading, isSizeInvalid, includeStatus, onFileChange, onDownload, }: FileLinkProps): import("react/jsx-runtime").JSX.Element;
