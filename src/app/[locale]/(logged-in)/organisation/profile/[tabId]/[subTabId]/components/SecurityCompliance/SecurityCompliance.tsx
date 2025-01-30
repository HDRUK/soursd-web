"use client";

import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { useStore } from "@/data/store";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";
import {
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
