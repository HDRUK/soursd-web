"use client";

import ButtonSave from "@/components/ButtonSave";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";

import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState } from "@/types/form";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface ProfessionalRegistrationsFormProps {
  onSubmit: (
    professionalRegistration: ResearcherProfessionalRegistration
  ) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";

export default function ProfessionalRegistrationsForm({
  onSubmit,
  queryState,
}: ProfessionalRegistrationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tProfile("memberIdRequiredInvalid")),
        name: yup.string().required(tProfile("nameRequiredInvalid")),
      }),
    [tProfile]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      name: "",
    },
  };

  return (
    <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
      <FormSection heading={tProfile("title")}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <FormControlHorizontal
              name="name"
              tNamespace={NAMESPACE_TRANSLATION_PROFILE}
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlHorizontal
              name="member_id"
              tNamespace={NAMESPACE_TRANSLATION_PROFILE}
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
        </Grid>
      </FormSection>
      <FormActions>
        <ButtonSave isLoading={queryState.isPending} />
      </FormActions>
    </Form>
  );
}
