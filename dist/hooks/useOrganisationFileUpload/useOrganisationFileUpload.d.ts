import { FileType } from "@/consts/files";
import { File, Organisation } from "@/types/application";
import { ChangeEvent } from "react";
export interface UseOrganisationFileUploadProps {
    fileType: FileType;
    organisation: Organisation;
    upload: (formData: FormData) => Promise<File | undefined>;
}
export default function useOrganisationFileUpload({ fileType, organisation, upload, }: UseOrganisationFileUploadProps): (name: string, e: ChangeEvent<HTMLInputElement>) => Promise<File | null | undefined>;
