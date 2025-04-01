"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { TextField, Grid } from "@mui/material";
import DateInput from "@/components/DateInput";
import FormControlWrapper from "@/components/FormControlWrapper";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import FormSection from "@/components/FormSection";
import { PatchOrganisationPayload } from "@/services/organisations";
import { dateToString } from "@/utils/date";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import {
  certificationRows,
  getDefaultValues,
  getValidation,
  SecurityCompilanceFormData,
} from "./config/form";
import CertificationUploader from "./CertificationUploader";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function SecurityCompliance() {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const { isPending: isLoading, onSubmit } = usePatchOrganisation({
    id: organisation?.id,
  });

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
                          <DateInput {...fieldProps} disabled={false} />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <FormControlWrapper
                    name={cert.certificationEvidence}
                    displayLabel={false}
                    renderField={fieldProps => (
                      <CertificationUploader
                        name={cert.name}
                        value={fieldProps.value}
                        onChange={fieldProps.onChange}
                      />
                    )}
                  />
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
