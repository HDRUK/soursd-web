"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import yup from "@/config/yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  mutateState: FormMutateState;
};

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_LOGIN_FORM = "LoginForm";

export default function SignupForm({ onSubmit, mutateState }: LoginFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tLogin = useTranslations(NAMESPACE_TRANSLATION_LOGIN_FORM);
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required(tValidation("emailRequiredInvalid")),
        password: yup.string().required(tValidation("passwordRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (values: LoginFormValues) => {
    if (recaptchaRef.current && recaptchaRef.current.getValue()) {
      setRecaptchaError("");
      onSubmit(values);
    } else {
      setRecaptchaError(tValidation("recaptchaError"));
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
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
            <Alert color="error" sx={{ mb: 3 }}>
              {tLogin.rich(mutateState.error, {
                contactLink: ContactLink,
              })}
            </Alert>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.email} size="small" fullWidth>
                <TextField
                  id="email"
                  size="small"
                  placeholder={tLogin("emailPlaceholder")}
                  aria-label={tLogin("email")}
                  label={<>{tLogin("email")} *</>}
                  {...register("email")}
                />
                {errors.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.password} size="small" fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tLogin("passwordPlaceholder")}
                  aria-label={tLogin("password")}
                  label={<>{tLogin("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tLogin("togglePasswordAriaLabel"),
                  }}
                  {...register("password")}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormRecaptcha ref={recaptchaRef} error={recaptchaError} />
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
            {tLogin("loginButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
