import { MutationState } from "../../types/form";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import { PostUserInvitePayload } from "../../services/users";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlHorizontal from "../../components/FormControlHorizontal";
import FormSection from "../../components/FormSection";

export interface InviteUserFormProps {
  onSubmit: (user: PostUserInvitePayload) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "User";

export default function InviteUserForm({
  onSubmit,
  queryState,
}: InviteUserFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tUser = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  };

  const formFields = ["first_name", "last_name", "email"];

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}
      shouldReset>
      {() => (
        <>
          <FormSection subtitle={tUser("inviteUserTitle")}>
            <Grid container rowSpacing={3}>
              {formFields.map((name: string) => (
                <Grid item xs={12}>
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
