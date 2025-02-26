import React, { ChangeEvent } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import { Grid } from "@mui/material";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";
import { useStore } from "@/data/store";
import { capitaliseFirstLetter } from "@/utils/string";
import { useTranslations } from "next-intl";

interface CertificationUploaderProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}
const NAMESPACE_TRANSLATION_CERT = "CertificationUpload";
const CertificationUploader = ({
  name,
  value,
  onChange,
}: CertificationUploaderProps) => {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_CERT);
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
    if (data?.name) {
      onChange(data.name);
    }
  };

  return (
    <Grid container item spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={3}>
        <FileLink
          fileButtonText={t("buttonText")}
          message={`${FileType.CERTIFICATION}${name.toUpperCase()}`}
          fileNameText={file?.name || "No certification uploaded"}
          isSizeInvalid={isSizeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
          onFileChange={handleFileChange}
          includeStatus
          canDownload
        />
      </Grid>
      <Grid item xs={8}>
        {value ? (
          <>
            <b> {t("evidence")} </b>
            {value}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CertificationUploader;
