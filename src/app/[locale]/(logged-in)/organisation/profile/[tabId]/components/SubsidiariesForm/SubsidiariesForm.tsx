"use client";
import React from "react";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
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

import { getValidation, getDefaultValues } from "./const/form";

import { FormData } from "./const/form";

type Certification = {
  certified: keyof FormData;
  certificationNum: keyof FormData;
};

export interface DetailsFormProps {
  onSubmit: (fields: Partial<PatchOrganisationPayload>) => void;
  queryState: QueryState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function SubsidiariesForm({
  onSubmit,
  queryState,
}: DetailsFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const organisation = useStore(state => state.config.organisation);

  const schema = getValidation(t);
  const defaultValues = useMemo(
    () => getDefaultValues(organisation),
    [organisation]
  );

  const certifications: Certification[] = [
    {
      certified: "ce_certified",
      certificationNum: "ce_certification_num",
    },
    {
      certified: "ce_plus_certified",
      certificationNum: "ce_plus_certification_num",
    },
    {
      certified: "iso_27001_certified",
      certificationNum: "iso_27001_certification_num",
    },
    {
      certified: "dsptk_certified",
      certificationNum: "dsptk_certification_num",
    },
  ];

  return (
    <Form schema={schema} defaultValues={defaultValues} onSubmit={onSubmit}>
      <>
        <FormSection heading={t("organisationSubsidiaries")}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                displayLabel={false}
                displayPlaceholder={false}
                labelMd={0}
                contentMd={12}
                name="subsidiaries"
                renderField={fieldProps => (
                  <FormFieldArray<FormData>
                    name={fieldProps.name}
                    boxSx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 3fr 1fr",
                    }}
                    removeButtonLabel={t(
                      "organisationSubsidiaries2.removeButton"
                    )}
                    addButtonLabel={t("organisationSubsidiaries2.addButton")}
                    createNewRow={() => ({
                      name: "",
                    })}
                    renderField={(field, index) => (
                      <React.Fragment key={field.name}>
                        <TextField
                          name={`subsidiaries.${index}.name`}
                          label="Name"
                          defaultValue={field.name}
                        />
                        <GoogleAutocomplete
                          name={`subsidiaries.${index}.address`}
                          textFieldProps={{
                            variant: "filled",
                            size: "small",
                          }}
                          fullWidth={true}
                          placeholder={t(
                            "organisationSubsidiaries2.addressPlaceholder"
                          )}
                        />
                      </React.Fragment>
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormSection>

        <FormSection heading={t("organisationDataSecurityCompliance")}>
          <Grid container rowSpacing={3}>
            {certifications.map(cert => (
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
            loading={queryState.isLoading}
            type="submit"
            endIcon={<SaveIcon />}>
            {tProfile("submitButton")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
