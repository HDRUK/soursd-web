"use client";

import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { useStore } from "@/data/store";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormSection from "@/components/FormSection";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormFieldArray from "@/components/FormFieldArray";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import { QueryState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import { PatchOrganisationPayload } from "@/services/organisations";
import {
  FormData,
  getValidation,
  getDefaultValues,
  certificationRows,
} from "./config/form";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function SecurityCompliance() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

  const schema = getValidation(t);
  const defaultValues = useMemo(
    () => getDefaultValues(organisation),
    [organisation]
  );

  return (
    <Form schema={schema} defaultValues={defaultValues} onSubmit={onSubmit}>
      <>
        <FormSection heading={t("organisationDataSecurityCompliance")}>
          <Grid container rowSpacing={3}>
            {certificationRows.map(cert => (
              <React.Fragment key={cert.certified}>
                <Grid item xs={4}>
                  <FormControlHorizontal
                    name={cert.certified}
                    displayPlaceholder={false}
                    labelMd={7}
                    contentMd={5}
                    renderField={fieldProps => (
                      <Checkbox {...fieldProps} checked={!!fieldProps.value} />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <FormControlHorizontal
                    name={cert.certificationNum}
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </FormSection>
        <FormActions>
          <LoadingButton
            loading={isLoading}
            type="submit"
            endIcon={<SaveIcon />}>
            {tProfile("submitButton")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
