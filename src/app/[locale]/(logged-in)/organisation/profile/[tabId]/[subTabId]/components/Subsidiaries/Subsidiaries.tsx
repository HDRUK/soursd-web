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
import TextField from "@mui/material/TextField";
import FormFieldArray from "@/components/FormFieldArray";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";

import { LoadingButton } from "@mui/lab";

import { FormData, getValidation, getDefaultValues } from "./config/form";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function Subsidiaries() {
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
                    createNewRow={() => ({
                      name: "",
                    })}
                    renderField={(field, index) => (
                      <React.Fragment key={field.name}>
                        <FormControlHorizontal
                          displayLabel={false}
                          labelMd={0}
                          contentMd={12}
                          name={`subsidiaries.${index}.name`}
                          placeholder={t("name")}
                          renderField={fieldProps => (
                            <TextField {...fieldProps} />
                          )}
                        />
                        <GoogleAutocomplete
                          name={`subsidiaries.${index}.address`}
                          textFieldProps={{
                            variant: "filled",
                            size: "small",
                          }}
                          fullWidth
                          placeholder={t("addressPlaceholder")}
                        />
                      </React.Fragment>
                    )}
                  />
                )}
              />
            </Grid>
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
