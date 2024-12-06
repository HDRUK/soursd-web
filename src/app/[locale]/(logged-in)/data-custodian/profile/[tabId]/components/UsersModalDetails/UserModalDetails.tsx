import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { DataCustodianUserRoles } from "@/consts/dataCustodian";
import { DataCustodianUser } from "@/types/application";
import { QueryState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface DataCustodianUserFields {
  first_name: string;
  last_name: string;
  email: string;
  administrator: boolean;
  approver: boolean;
}

export interface UserModalDetailsProps {
  user: Partial<DataCustodianUser>;
  queryState: QueryState;
  onSubmit: (payload: DataCustodianUserFields) => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function UserModalDetails({
  user,
  queryState,
  onSubmit,
}: UserModalDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup.string().required(tForm("organisationNameRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<DataCustodianUserFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      administrator: user?.role === DataCustodianUserRoles.ADMINISTRATOR,
      approver: user?.role === DataCustodianUserRoles.APPROVER,
    },
    disabled: queryState.isLoading,
  });

  const handleCheckRole = (e: ChangeEvent<HTMLInputElement>) => {
    Object.values(DataCustodianUserRoles).forEach(role => {
      setValue(role, false);
    });

    setValue(e.target.name, e.target.checked);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const administratorProps = register("administrator");
  const approverProps = register("approver");

  const administratorValue = watch("administrator");
  const approverValue = watch("approver");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormModalHeader>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {user?.id ? t("updateUserTitle") : t("createUserTitle")}
          </Typography>
          <Typography>
            {user?.id ? t("updateUserDescription") : t("createUserDescription")}
          </Typography>
        </FormModalHeader>
        <FormModalBody>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControl error={!!errors.first_name} size="small" fullWidth>
                <FormControlHorizontal
                  label={tForm("firstName")}
                  error={errors.first_name}
                  id="first_name">
                  <TextField
                    {...register("first_name")}
                    size="small"
                    placeholder={tForm("firstNamePlaceholder")}
                  />
                </FormControlHorizontal>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!errors.last_name} size="small" fullWidth>
                <FormControlHorizontal
                  label={tForm("lastName")}
                  error={errors.last_name}
                  id="last_name">
                  <TextField
                    {...register("last_name")}
                    size="small"
                    placeholder={tForm("lastNamePlaceholder")}
                  />
                </FormControlHorizontal>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!errors.email} size="small" fullWidth>
                <FormControlHorizontal
                  label={tForm("email")}
                  error={errors.email}
                  id="email">
                  <TextField
                    {...register("email")}
                    fullWidth
                    size="small"
                    placeholder={tForm("emailPlaceholder")}
                  />
                </FormControlHorizontal>
              </FormControl>
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
                {...administratorProps}
                checked={!!administratorValue}
                onChange={handleCheckRole}
                label={tForm("roleAdministrator")}
                labelCaption={t("roleAdministratorDescription")}
              />
            </Grid>
            <Grid item md={6}>
              <FormControlCheckbox
                {...approverProps}
                checked={!!approverValue}
                onChange={handleCheckRole}
                label={tForm("roleApprover")}
                labelCaption={t("roleApproverDescription")}
              />
            </Grid>
          </Grid>
        </FormModalBody>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<CheckIcon />}
          loading={queryState.isLoading}
          sx={{ mt: 5 }}>
          {t("submitButton")}
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
