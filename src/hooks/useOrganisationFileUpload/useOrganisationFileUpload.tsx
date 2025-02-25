import { FileType } from "@/consts/files";
import { EntityType } from "@/types/api";
import { File, Organisation } from "@/types/application";
import { getFileFromEvent } from "@/utils/file";
import { ChangeEvent, useCallback } from "react";

export interface UseOrganisationFileUploadProps {
  fileType: FileType;
  organisation: Organisation;
  upload: (formData: FormData) => Promise<File | undefined>;
}

export default function useOrganisationFileUpload({
  fileType,
  organisation,
  upload,
}: UseOrganisationFileUploadProps) {
  return useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      console.log("starting to call useOrganisation file upload");
      const fileFromEvent = getFileFromEvent(e);
      const formData = new FormData();

      if (fileFromEvent) {
        formData.append("file", fileFromEvent);
        formData.append("file_type", fileType);
        formData.append("entity_type", EntityType.ORGANISATION);
        //formData.append("registry_id", `${user?.registry_id}`);

        const fileFromApi = await upload(formData);
        console.log(fileFromApi);

        return fileFromApi;
      }

      return null;
    },
    [organisation?.id]
  );
}
