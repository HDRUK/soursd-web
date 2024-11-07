"use client";

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
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";

export interface SignupFormValues {
  password?: string | undefined;
  confirmPassword: string;
  tscs: NonNullable<boolean | undefined>;
}

export type SignupFormProps = {
  mutateState: FormMutateState;
  onSubmit: (values: SignupFormValues) => void;
};

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function SignupForm({ onSubmit, mutateState }: SignupFormProps) {
  const {
    validationSchema: { password },
  } = useApplicationData();
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        password: yup
          .string()
          .required(tForm("passwordRequiredInvalid"))
          .testLengthBetween(
            { minLength: password.minLength, maxLength: password.maxLength },
            tForm("passwordLengthInvalid", {
              minLength: password.minLength,
              maxLength: password.maxLength,
            })
          ),
        confirmPassword: yup
          .string()
          .required(tForm("confirmPasswordRequiredInvalid"))
          .oneOf(
            [yup.ref("password"), ""],
            tForm("confirmPasswordMatchInvalid")
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
              <FormControl
                error={!!errors.confirmPassword}
                size="small"
                fullWidth>
                <PasswordTextField
                  id="confirmPassword"
                  size="small"
                  placeholder={tForm("confirmPasswordPlaceholder")}
                  label={<>{tForm("confirmPassword")}</>}
                  iconButtonProps={{
                    "aria-label": tForm("toggleConfirmPasswordAriaLabel"),
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
