"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormHeader from "@/components/FormHeader";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";
import {
  Alert,
  Box,
  Button,
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
import * as yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  mutateState: {
    isError: boolean;
    isLoading: boolean;
  };
}

const NAMESPACE_TRANSLATION_VALIDATION = "FormValidation";
const NAMESPACE_TRANSLATION_LOGIN = "LoginForm";

export default function LoginForm({ onSubmit, mutateState }: LoginFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tLogin = useTranslations(NAMESPACE_TRANSLATION_LOGIN);
  const theme = useTheme();
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required(tValidation("emailRequiredInvalid")),
        password: yup.string().required(tValidation("passwordRequiredInvalid")),
      }),
    []
  );

  const handleFormSubmit = (data: LoginFormValues) => {
    if (recaptchaRef.current) {
      if (recaptchaRef.current.getValue()) {
        setRecaptchaError("");
        onSubmit(data);
      } else {
        setRecaptchaError(tValidation("recaptchaError"));
      }
    }
  };

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
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
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
        sx={{
          width: "auto",
          [theme.breakpoints.up("md")]: { width: "350px" },
        }}>
        <FormHeader icon={<LoginIcon sx={{ ml: "-2px" }} />}>
          {tLogin("title")}
        </FormHeader>
        <FormBody>
          {mutateState.isError && (
            <Alert color="error">{tLogin("loginError")}</Alert>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.email} variant="standard" fullWidth>
                <TextField
                  {...register("email")}
                  size="small"
                  placeholder={tLogin("emailPlaceholder")}
                  aria-label={tLogin("email")}
                  label={<>{tLogin("email")} *</>}
                />
                {errors.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.password}
                variant="standard"
                fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tLogin("passwordPlaceholder")}
                  aria-label={tLogin("password")}
                  label={<>{tLogin("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tLogin("togglePasswordAriaLabel"),
                  }}
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth>
            {tLogin("loginButton")}
          </Button>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
