import { FileLinkProps } from "@/components/FileLink";
import { FileType } from "@/consts/files";
export interface FileUploadDetailsProps extends FileLinkProps {
    fileType: FileType;
}
export default function FileUploadDetails({ fileType, ...fileLinkProps }: FileUploadDetailsProps): import("react/jsx-runtime").JSX.Element;
