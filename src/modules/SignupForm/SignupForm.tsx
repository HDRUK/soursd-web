"use client";

import ImageDecorator from "@/components/ImageDecorator";
import PasswordTextField from "@/components/PasswordTextField";
import {
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_LENGTH,
} from "@/consts/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  tscs: boolean;
}

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const t = useTranslations();

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .required(t("FormValidation.emailRequiredInvalid"))
          .email(t("FormValidation.emailFormatInvalid")),
        password: yup
          .string()
          .required(t("FormValidation.passwordRequiredInvalid"))
          .min(
            VALIDATION_PASSWORD_LENGTH,
            t("FormValidation.passwordLengthInvalid", {
              length: VALIDATION_PASSWORD_LENGTH,
            })
          )
          .matches(
            VALIDATION_PASSWORD_FORMAT,
            t("FormValidation.passwordFormatInvalid")
          ),
        confirmPassword: yup
          .string()
          .required(t("FormValidation.confirmPasswordRequiredInvalid"))
          .oneOf(
            [yup.ref("password"), ""],
            t("FormValidation.confirmPasswordMatchInvalid")
          ),
        tscs: yup
          .bool()
          .oneOf([true], t("FormValidation.tscsRequiredInvalid"))
          .required(t("FormValidation.tscsRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <ImageDecorator>
            <Person />
          </ImageDecorator>
        </Box>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Sign up
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl error={!!errors.email} variant="standard" fullWidth>
              <TextField
                {...register("email")}
                size="small"
                placeholder={t("SignupForm.emailPlaceholder")}
                aria-label={t("SignupForm.email")}
                label={<>{t("SignupForm.email")} *</>}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!errors.password} variant="standard" fullWidth>
              <PasswordTextField
                id="password"
                size="small"
                placeholder={t("SignupForm.passwordPlaceholder")}
                aria-label={t("SignupForm.password")}
                label={<>{t("SignupForm.password")} *</>}
                iconButtonProps={{
                  "aria-label": t("SignupForm.togglePasswordAriaLabel"),
                }}
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              error={!!errors.confirmPassword}
              variant="standard"
              fullWidth>
              <PasswordTextField
                id="confirmPassword"
                size="small"
                placeholder={t("SignupForm.confirmPasswordPlaceholder")}
                aria-label={t("SignupForm.confirmPassword")}
                label={<>{t("SignupForm.confirmPassword")} *</>}
                iconButtonProps={{
                  "aria-label": t("SignupForm.toggleConfirmPasswordAriaLabel"),
                }}
              />
              {errors.confirmPassword && (
                <FormHelperText>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!errors.tscs} variant="standard" fullWidth>
              <FormControlLabel
                control={<Checkbox {...register("tscs")} />}
                label="I agree to the Terms and Conditions"
                aria-label={t("SignupForm.agreeTermsAndConditions")}
              />
              {errors.tscs && (
                <FormHelperText>{errors.tscs.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth>
              {t("SignupForm.signupButton")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
