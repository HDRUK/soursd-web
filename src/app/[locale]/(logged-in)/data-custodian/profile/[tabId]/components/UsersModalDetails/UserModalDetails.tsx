import Form from "@/components/Form";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { CustodianUserRoles } from "@/consts/custodian";
import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { CustodianUser } from "@/types/application";
import { QueryState } from "@/types/form";
import {
  isCustodianAdministrator,
  isCustodianApprover,
} from "@/utils/custodian";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";

export interface CustodianUserFields {
  first_name: string;
  last_name: string;
  email: string;
  administrator: boolean;
  approver: boolean;
}

export interface UserModalDetailsProps {
  user: Partial<CustodianUser>;
  queryState: QueryState;
  onSubmit: (payload: CustodianUserFields) => void;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function UserModalDetails({
  onClose,
  user,
  queryState,
  onSubmit,
}: UserModalDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const permissions = useStore(state => state.config.permissions);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup
          .string()
          .email(t("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      administrator: user && isCustodianAdministrator(user, permissions),
      approver: isCustodianApprover(user, permissions),
    },
    disabled: queryState.isLoading,
  };

  const handleCheckRole = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<CustodianUserFields>
  ) => {
    Object.values(CustodianUserRoles).forEach(role => {
      setValue(role, false);
    });

    setValue(e.target.name, e.target.checked);
  };

  return (
    <Form
      schema={schema}
      {...formOptions}
      onSubmit={onSubmit}
      autoComplete="off">
      {({ formState: { errors }, register, watch, setValue }) => (
        <>
          <FormModalHeader>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {user?.id ? t("updateUserTitle") : t("createUserTitle")}
            </Typography>
            <Typography>
              {user?.id
                ? t("updateUserDescription")
                : t("createUserDescription")}
            </Typography>
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
          <FormModalHeader>
            <Typography variant="h4">Permissions</Typography>
          </FormModalHeader>
          <FormModalBody sx={{ mt: -1 }}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md={6}>
                <FormControlCheckbox
                  {...register("administrator")}
                  checked={!!watch("administrator")}
                  onChange={e => handleCheckRole(e, setValue)}
                  label={tForm("roleAdministrator")}
                  labelCaption={t("roleAdministratorDescription")}
                />
              </Grid>
              <Grid item md={6}>
                <FormControlCheckbox
                  {...register("approver")}
                  checked={!!watch("approver")}
                  onChange={e => handleCheckRole(e, setValue)}
                  label={tForm("roleApprover")}
                  labelCaption={t("roleApproverDescription")}
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
              loading={queryState.isLoading}>
              {t("submitButton")}
            </LoadingButton>
          </FormModalActions>
        </>
      )}
    </Form>
  );
}
