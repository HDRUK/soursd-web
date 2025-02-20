"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormFieldArray from "@/components/FormFieldArray";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { Organisation } from "@/types/application";
import { useRouter } from "next/navigation";
import { FormData, getDefaultValues, getValidation } from "./config/form";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function Subsidiaries() {
  const router = useRouter();
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const { isPending: isLoading, onSubmit } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

  const schema = getValidation(tForm);
  const defaultValues = useMemo(
    () => getDefaultValues(organisation),
    [organisation]
  );

  const handleSubmit = (fields: Partial<Organisation>) => {
    onSubmit(fields).then(() => {
      router.push(ROUTES.profileOrganisationDetailsSecurityCompliance.path);
    });
  };

  return (
    <PageBody>
      <PageSection>
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          key={organisation?.id}>
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
                            alignItems: "flex-end",
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
                                placeholder={tForm("name")}
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
                                  placeholder={tForm("addressPlaceholder")}
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
                  <ProfileNavigationFooter
                    previousHref={
                      ROUTES.profileOrganisationDetailsSectorSizeAndWebsite.path
                    }
                    nextStepText={tOrgProfile("detailsSecurityCompliance")}
                    isLoading={isLoading}
                    isDisabled={nsubs < 1}
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
