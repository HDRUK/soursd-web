import { Box } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import FileLink from "../FileLink";
import { FileType } from "../../consts/files";
import useFileUpload from "../../hooks/useFileUpload";
import { getFileFromEvent } from "../../utils/file";

interface UserBulkInviteProps {
  organisation_id: number;
}

export default function UserBulkInvite({
  organisation_id,
}: UserBulkInviteProps) {
  const {
    upload,
    isScanComplete,
    isScanFailed,
    isScanning,
    isSizeInvalid,
    isUploading,
  } = useFileUpload("bulkInviteUploadError");

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = getFileFromEvent(e);

      if (file) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("file_type", FileType.RESEARCHER_LIST);
        formData.append("organisation_id", `${organisation_id}`);

        upload(formData);
      }
    },
    []
  );

  return (
    <Box>
      <Box sx={{ minWidth: "210px", maxWidth: "210px" }}>
        <FileLink
          accept=".csv"
          includeStatus={false}
          fileButtonText="Bulk upload users"
          isSizeInvalid={isSizeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
          onFileChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}
