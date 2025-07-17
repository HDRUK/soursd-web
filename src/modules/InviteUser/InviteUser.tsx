import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlHorizontal from "../../components/FormControlHorizontal";
import FormSection from "../../components/FormSection";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import { PostUserInvitePayload } from "../../services/users";
import { MutationState } from "../../types/form";
import SelectOrganisation from "@/components/SelectOrganisation";

export interface InviteUserFormProps {
  onSubmit: (user: PostUserInvitePayload) => void;
  queryState: MutationState;
  selectedOrganisationId?: number;
  setSelectedOrganisationId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "User";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function InviteUserForm({
  onSubmit,
  queryState,
  selectedOrganisationId,
  setSelectedOrganisationId,
}: InviteUserFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tUser = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
        organisation_id: yup
          .number()
          .required(tForm("organisationRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      organisation_id: selectedOrganisationId,
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
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="organisation_id"
                  renderField={({ onChange, ...fieldProps }) => (
                    <SelectOrganisation
                      {...fieldProps}
                      onChange={e => {
                        setSelectedOrganisationId?.(e.target.value as number);
                        onChange(e);
                      }}
                    />
                  )}
                  description={tProfile.rich("organisationNotListed", {
                    link: chunks => (
                      <Link
                        component="button"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          //setSelectOrganisation(false);
                        }}
                        sx={{ pb: 0.25 }}>
                        {chunks}
                      </Link>
                    ),
                  })}
                />
              </Grid>
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
