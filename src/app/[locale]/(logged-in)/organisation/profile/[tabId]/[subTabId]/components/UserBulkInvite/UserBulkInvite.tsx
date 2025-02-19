import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import useFileUpload from "@/hooks/useFileUpload";
import {
  mockedOrganisationBulkInviteIntro,
  mockedOrganisationUsersIntro,
} from "@/mocks/data/cms";
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
    <>
      <Typography sx={{ mb: 4 }}>{mockedOrganisationUsersIntro}</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add users
      </Typography>
      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        <Typography sx={{ flexGrow: 1 }}>
          {mockedOrganisationBulkInviteIntro}
        </Typography>
        <Box sx={{ minWidth: "210px" }}>
          <FileLink
            accept=".csv"
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