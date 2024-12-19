import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import yup from "@/config/yup";
import { QueryState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

  const methods = useForm<UserFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormModalHeader>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {t("inviteUserTitle")}
          </Typography>
          <Typography>{t("inviteUserDescription")}</Typography>
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
        <FormModalActions>
          <Button variant="outlined" onClick={onClose}>
            {tForm("cancelButton")}
          </Button>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<CheckIcon />}
            loading={queryState.isLoading}>
            {t("sendInviteButton")}
          </LoadingButton>
        </FormModalActions>
      </form>
    </FormProvider>
  );
}
