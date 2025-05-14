import { FileType } from "@/consts/files";
import { File, User } from "@/types/application";
import { ChangeEvent } from "react";
export interface UseUserFileUploadProps {
    fileType: FileType;
    user: User;
    upload: (formData: FormData) => Promise<File | undefined>;
}
export default function useUserFileUpload({ fileType, user, upload, }: UseUserFileUploadProps): (e: ChangeEvent<HTMLInputElement>) => Promise<any>;
