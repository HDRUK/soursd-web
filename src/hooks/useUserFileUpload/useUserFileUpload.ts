import { FileType } from "@/consts/files";
import { EntityType } from "@/types/api";
import { File, User } from "@/types/application";
import { getFileFromEvent } from "@/utils/file";
import { ChangeEvent, useCallback } from "react";

export interface UseUserFileUploadProps {
  fileType: FileType;
  user: User;
  upload: (formData: FormData) => Promise<File | undefined>;
}

export default function useUserFileUpload({
  fileType,
  user,
  upload,
}: UseUserFileUploadProps) {
  return useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const fileFromEvent = getFileFromEvent(e);
      const formData = new FormData();

      if (fileFromEvent) {
        formData.append("file", fileFromEvent);
        formData.append("file_type", fileType);
        formData.append("entity_type", EntityType.RESEARCHER);
        formData.append("registry_id", `${user?.registry_id}`);

        const fileFromApi = await upload(formData);

        if (fileFromApi) {
          const updatedUser = {
            ...user,
            registry: {
              ...user?.registry,
              files: [...(user?.registry?.files || []), fileFromApi],
            },
          };

          return updatedUser;
        }
      }

      return null;
    },
    [user?.registry_id]
  );
}
