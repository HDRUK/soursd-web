import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import { Message } from "@/components/Message";
import PasswordTextField from "@/components/PasswordTextField";
import yup from "@/config/yup";
import { useApplicationData } from "@/context/ApplicationData";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface SignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  tscs: boolean;
}

export interface SignupFormProps {
  mutateState: FormMutateState;
  onSubmit: (data: SignupFormValues) => void;
  defaultEmail?: string;
  defaultFirstname?: string;
  defaultLastname?: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function SignupForm({
  onSubmit,
  mutateState,
  defaultEmail,
  defaultFirstname,
  defaultLastname,
}: SignupFormProps) {
  const {
    validationSchema: { password },
  } = useApplicationData();
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        email: yup
          .string()
          .required(tForm("emailRequiredInvalid"))
          .email(tForm("emailFormatInvalid")),
        password: yup
          .string()
          .required(tForm("passwordRequiredInvalid"))
          .testLengthBetween(
            { minLength: password.minLength, maxLength: password.maxLength },
            tForm("passwordLengthInvalid", {
              minLength: password.minLength,
              maxLength: password.maxLength,
            })
          )
          .matches(
            new RegExp(password.pattern),
            tForm("passwordFormatInvalid")
          ),
        tscs: yup
          .bool()
          .oneOf([true], tForm("tscsRequiredInvalid"))
          .required(tForm("tscsRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: defaultFirstname,
      last_name: defaultLastname,
      email: defaultEmail,
      password: "",
      tscs: false,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{
          width: "auto",
          [".MuiGrid-root .MuiGrid-item"]: {
            maxWidth: "100%",
          },
          [theme.breakpoints.up("md")]: { width: "350px" },
        }}>
        <FormBody>
          {mutateState.isError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {tSignup.rich(mutateState.error, {
                contactLink: ContactLink,
              })}
            </Message>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item spacing={2}>
              <FormControl error={!!errors.first_name} size="small" fullWidth>
                <TextField
                  {...register("first_name")}
                  size="small"
                  placeholder={tForm("firstNamePlaceholder")}
                  label={<>{tForm("firstName")}</>}
                />
                {errors.first_name && (
                  <FormHelperText>{errors.first_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item spacing={2}>
              <FormControl error={!!errors.last_name} size="small" fullWidth>
                <TextField
                  {...register("last_name")}
                  size="small"
                  placeholder={tForm("lastNamePlaceholder")}
                  label={<>{tForm("lastName")}</>}
                />
                {errors.last_name && (
                  <FormHelperText>{errors.last_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {!defaultEmail && (
              <Grid item>
                <FormControl error={!!errors.email} size="small" fullWidth>
                  <TextField
                    {...register("email")}
                    size="small"
                    placeholder={tForm("emailPlaceholder")}
                    label={<>{tForm("email")}</>}
                    disabled={!!defaultEmail}
                  />
                  {errors.email && (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl error={!!errors.password} size="small" fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tForm("passwordPlaceholder")}
                  label={<>{tForm("password")}</>}
                  iconButtonProps={{
                    "aria-label": tForm("togglePasswordAriaLabel"),
                  }}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.tscs} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("tscs")} />}
                  label={tForm("agreeTermsAndConditions")}
                  aria-label={tForm("agreeTermsAndConditionsAriaLabel")}
                />
                {errors.tscs && (
                  <FormHelperText>{errors.tscs.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </FormBody>
        <FormActions>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
            loading={mutateState.isLoading}>
            {tSignup("signupButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
