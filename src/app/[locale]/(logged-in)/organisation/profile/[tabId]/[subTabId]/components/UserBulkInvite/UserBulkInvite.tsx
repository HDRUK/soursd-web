import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import useFileUpload from "@/hooks/useFileUpload";
import { getFileFromEvent } from "@/utils/file";
import { Box, Typography } from "@mui/material";
import { ChangeEvent, useCallback } from "react";

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
  } = useFileUpload();

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
    <>
      <Typography sx={{ mb: 4 }}>
        As a representative of an Organisation, you have been given permission
        to associate your affiliated Users (an employee or student of your
        Organisation) with your Organisation’s SOURSD account. Users are
        individuals involved in active research projects using sensitive data.{" "}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add users
      </Typography>
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        <Typography sx={{ flexGrow: 1 }}>
          Add new affiliated Users to SOURSD. Individual Users will create a
          SOURSD account for themselves and will affiliate themselves with an
          Organisation.
        </Typography>
        <Box sx={{ minWidth: "210px" }}>
          <FileLink
            includeStatus={false}
            fileButtonText="Bulk upload Users"
            isSizeInvalid={isSizeInvalid}
            isScanning={isScanning}
            isScanComplete={isScanComplete}
            isScanFailed={isScanFailed}
            isUploading={isUploading}
            onFileChange={handleFileChange}
          />
        </Box>
      </Box>
    </>
  );
}
