"use client";

import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
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
                        <Checkbox
                          {...fieldProps}
                          checked={!!fieldProps.value}
                        />
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
