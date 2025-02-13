"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormFieldArray from "@/components/FormFieldArray";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";
import { FormData, getDefaultValues, getValidation } from "./config/form";
import ButtonSave from "@/components/ButtonSave";

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
    <PageBody>
      <PageSection>
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
                  <ButtonSave
                    isLoading={isLoading}
                    disabled={nsubs === 0 || isLoading}
                  />
                </FormActions>
              </>
            );
          }}
        </Form>
      </PageSection>
    </PageBody>
  );
}
