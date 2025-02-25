"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Grid } from "@mui/material";

import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";
import {
  certificationRows,
  getDefaultValues,
  getValidation,
} from "./config/form";
import FormSection from "@/components/FormSection";
import DateInput from "@/components/DateInput";

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function SecurityCompliance() {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { isPending: isLoading, onSubmit } = usePatchOrganisation({
    id: organisation?.id,
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
          <>
            {certificationRows.map(cert => (
              <FormSection heading={"test"}>
                <Grid container rowSpacing={3} sx={{ width: "70%" }}>
                  {/*<Grid item xs={12}>
                    <FormControlWrapper
                      name={cert.certified}
                      renderField={fieldProps => (
                        <Checkbox
                          {...fieldProps}
                          checked={!!fieldProps.value}
                        />
                      )}
                    />
                  </Grid>*/}
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name={cert.certificationNum}
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  {cert.certificationExpiryDate ? (
                    <Grid item xs={12}>
                      <FormControlWrapper
                        name={cert.certificationExpiryDate}
                        renderField={fieldProps => (
                          <DateInput
                            {...fieldProps}
                            disabled={false}
                            format={"DD-MM-YYYY"}
                            views={["day", "month", "year"]}
                            sx={{ width: "50%" }}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    "no expire date"
                  )}
                </Grid>
              </FormSection>
            ))}

            <FormActions>
              <ProfileNavigationFooter
                previousHref={
                  ROUTES.profileOrganisationDetailsSubsidiaries.path
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
