import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { QueryState } from "@/types/form";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface UserFields {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserModalDetailsProps {
  onClose: () => void;
  queryState: QueryState;
  onSubmit: (fields: UserFields) => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function UserModalDetails({
  onClose,
  onSubmit,
  queryState,
}: UserModalDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

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
    []
  );

  const { isLoading, isError, error } = queryState;

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    error:
      isError &&
      t.rich(error, {
        contactLink: ContactLink,
      }),
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} {...formOptions}>
      {({ formState: { errors } }) => (
        <>
          <FormModalHeader>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {t("inviteUserTitle")}
            </Typography>
            <Typography>{t("inviteUserDescription")}</Typography>
          </FormModalHeader>
          <FormModalBody>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="first_name"
                  error={errors.first_name}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="last_name"
                  error={errors.last_name}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="email"
                  error={errors.email}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
            </Grid>
          </FormModalBody>
          <FormModalActions>
            <Button variant="outlined" onClick={onClose}>
              {tForm("cancelButton")}
            </Button>
            <LoadingButton
              type="submit"
              endIcon={<CheckIcon />}
              loading={isLoading}>
              {t("sendInviteButton")}
            </LoadingButton>
          </FormModalActions>
        </>
      )}
    </Form>
  );
}
