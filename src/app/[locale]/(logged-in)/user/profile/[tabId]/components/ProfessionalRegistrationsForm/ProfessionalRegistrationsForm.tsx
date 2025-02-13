import ButtonSave from "@/components/ButtonSave";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";

import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState } from "@/types/form";
import { Checkbox, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface ProfessionalRegistrationsFormProps {
  onSubmit: (
    professionalRegistration: ResearcherProfessionalRegistration
  ) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function AffiliationsForm({
  onSubmit,
  queryState,
}: ProfessionalRegistrationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup
          .string()
          .required(tForm("registrationIdRequiredInvalid")),
        name: yup.string().required(tForm("nameRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      name: "",
    },
  };

  return (
    <>
      <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
        <FormSection heading={tApplication("affiliations")}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                name="current_employer"
                renderField={fieldProps => <Checkbox {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                name="name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                name="member_id"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormSection>
        <FormActions>
          <ButtonSave isLoading={queryState.isPending} />
        </FormActions>
      </Form>
    </>
  );
}
