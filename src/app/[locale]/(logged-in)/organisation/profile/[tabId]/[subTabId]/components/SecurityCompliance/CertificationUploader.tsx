import React, { ChangeEvent } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import useFileDownload from "@/hooks/useFileDownload";
import FileLink from "@/components/FileLink";
import getFileQuery from "@/services/files/getFileQuery";
import { useQuery } from "@tanstack/react-query";
import { FileType } from "@/consts/files";
import { Grid } from "@mui/material";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";
import { useStore } from "@/data/store";
import { capitaliseFirstLetter } from "@/utils/string";
import { useTranslations } from "next-intl";

interface CertificationUploaderProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}
const NAMESPACE_TRANSLATION_CERT = "CertificationUpload";
const CertificationUploader = ({
  name,
  value,
  onChange,
}: CertificationUploaderProps) => {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_CERT);

  const { data: fileData } = useQuery({
    ...getFileQuery(value as number),
    queryKey: [`getFile${value}`],
    enabled: !!value,
  });

  const { downloadFile } = useFileDownload(fileData?.data?.id as number);

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload(`certification${capitaliseFirstLetter(name)}UploadFailed`);

  const uploadFile = useOrganisationFileUpload({
    organisation: organisation!,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = await uploadFile(name, e);
    if (data?.id) {
      onChange(data.id);
    }
  };

  return (
    <Grid container item spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={4}>
        <FileLink
          fileButtonText={
            file?.name || fileData?.data.name
              ? t("buttonTextAlt")
              : t("buttonText")
          }
          message={`${FileType.CERTIFICATION}${name.toUpperCase()}`}
          fileNameText={file?.name || fileData?.data.name}
          isSizeInvalid={isSizeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
          onFileChange={handleFileChange}
          onDownload={() => downloadFile()}
          includeStatus
        />
      </Grid>
    </Grid>
  );
};

export default CertificationUploader;
