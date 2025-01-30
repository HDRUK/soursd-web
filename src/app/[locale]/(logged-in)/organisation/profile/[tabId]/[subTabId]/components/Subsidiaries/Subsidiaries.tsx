"use client";

import { Grid, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { useStore } from "@/data/store";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import TextField from "@mui/material/TextField";
import FormFieldArray from "@/components/FormFieldArray";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";

import { LoadingButton } from "@mui/lab";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";

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

  const { isPending: isLoading, onSubmit } = usePatchOrganisation({
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
      {({ watch }) => {
        const nsubs = watch("subsidiaries").length;
        return (
          <>
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
                          <Box sx={{ mt: 1 }}>
                            <GoogleAutocomplete
                              name={`subsidiaries.${index}.address`}
                              textFieldProps={{
                                variant: "filled",
                                size: "small",
                              }}
                              fullWidth
                              placeholder={t("addressPlaceholder")}
                            />
                          </Box>
                        </React.Fragment>
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <FormActions>
              <LoadingButton
                disabled={nsubs === 0}
                loading={isLoading}
                type="submit"
                endIcon={<SaveIcon />}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        );
      }}
    </Form>
  );
}
