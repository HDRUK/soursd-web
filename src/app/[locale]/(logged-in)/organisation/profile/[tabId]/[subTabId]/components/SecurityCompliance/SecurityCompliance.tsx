"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import FormSection from "@/components/FormSection";
import DateInput from "@/components/DateInput";
import { PatchOrganisationPayload } from "@/services/organisations";
import { dateToString } from "@/utils/date";
import useFileUpload from "@/hooks/useFileUpload";
import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import { ChangeEvent } from "react";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";
import {
  certificationRows,
  getDefaultValues,
  getValidation,
  SecurityCompilanceFormData,
} from "./config/form";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
const NAMESPACE_TRANSLATION_CERT = "Certification";

export default function SecurityCompliance() {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tCert = useTranslations(NAMESPACE_TRANSLATION_CERT);

  const { isPending: isLoading, onSubmit } = usePatchOrganisation({
    id: organisation?.id,
  });

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload("certificationUploadFailed");

  const schema = getValidation(t);
  const defaultValues = useMemo(
    () => getDefaultValues(organisation),
    [organisation]
  );

  const handleSubmit = (data: SecurityCompilanceFormData) => {
    const payload = {
      ...data,
      ce_expiry_date: dateToString(data.ce_expiry_date),
      ce_plus_expiry_date: dateToString(data.ce_plus_expiry_date),
      iso_expiry_date: dateToString(data.iso_expiry_date),
      dsptk_expiry_date: dateToString(data.dsptk_expiry_date),
    } as PatchOrganisationPayload;
    onSubmit(payload);
  };

  const uploadFile = useOrganisationFileUpload({
    organisation,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("gonna call upload file");
    const data = await uploadFile(e);
    console.log(data);

    //if (updatedUser) setUser(updatedUser);
  };

  return (
    <PageBody>
      <PageSection
        heading={tProfile("dataSecurityCompliance")}
        description={tProfile("dataSecurityComplianceText")}>
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}>
          <>
            {certificationRows.map(cert => (
              <FormSection heading={t(cert.name)}>
                <Grid container rowSpacing={3}>
                  {/*
                  <Grid container item spacing={3}>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name={cert.certificationNum}
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item spacing={3}>
                    <Grid item xs={3}>
                      <FormControlWrapper
                        name={cert.certificationExpiryDate}
                        renderField={fieldProps => (
                          <>
                            <DateInput {...fieldProps} disabled={false} />
                          </>
                        )}
                      />
                    </Grid>
                  </Grid>*/}

                  <Grid container item spacing={3}>
                    <Grid item xs={3}>
                      <Box sx={{ mx: 2 }}>
                        <FileLink
                          fileButtonText={tProfile("uploadCertification")}
                          fileType={FileType.CERTIFICATION}
                          fileNameText={
                            file?.name || tProfile("noCertificationUploaded")
                          }
                          isSizeInvalid={isSizeInvalid}
                          isScanning={isScanning}
                          isScanComplete={isScanComplete}
                          isScanFailed={isScanFailed}
                          isUploading={isUploading}
                          onFileChange={handleFileChange}
                          fileInputLabelText={tCert("fileInputLabel")}
                          fileScanErrorText={tCert("fileScanError")}
                          fileScanningText={tCert("fileScanning")}
                          fileScanOkText={tCert("fileScanOk")}
                          includeStatus
                          canDownload
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </FormSection>
            ))}

            <FormActions>
              <ProfileNavigationFooter
                previousHref={
                  ROUTES.profileOrganisationDetailsSectorSizeAndWebsite.path
                }
                isLoading={isLoading}
              />
            </FormActions>
          </>
        </Form>
      </PageSection>
    </PageBody>
  );
}
