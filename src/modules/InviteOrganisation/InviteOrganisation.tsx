import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { MAX_FORM_WIDTH } from "@/consts/form";
import { PostOrganisationUnclaimedPayload } from "@/services/organisations";
import { MutationState } from "@/types/form";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface InviteOrganisationFormProps {
  onSubmit: (organisation: PostOrganisationUnclaimedPayload) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "Organisation";

export default function InviteOrganisationForm({
  onSubmit,
  queryState,
}: InviteOrganisationFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrganisation = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION);

  const schema = useMemo(
    () =>
      yup.object().shape({
        organisation_name: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        lead_applicant_email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      organisation_name: "",
      lead_applicant_email: "",
    },
  };

  const formFields = ["organisation_name", "lead_applicant_email"];

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}>
      {() => (
        <>
          <FormSection subtitle={tOrganisation("inviteOrganisationTitle")}>
            <Grid container rowSpacing={3}>
              {formFields.map((name: string) => (
                <Grid item xs={12} key={name}>
                  <FormControlHorizontal
                    name={name}
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              ))}
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              type="submit"
              endIcon={<SaveIcon />}
              loading={queryState.isPending}
              sx={{ display: "flex", justifySelf: "end" }}>
              {tForm(`inviteButton`)}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
