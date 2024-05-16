"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormHeader from "@/components/FormHeader";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import {
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_LENGTH,
} from "@/consts/form";
import { IssuerDetailsResponse } from "@/services/endpoint/types";
import { yupResolver } from "@hookform/resolvers/yup";
import HubIcon from "@mui/icons-material/Hub";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
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
import * as yup from "yup";

export interface SignupFormValues {
  password: string;
  confirmPassword: string;
  tscs: boolean;
}

export type SignupFormProps = {
  onSubmit: (data: SignupFormValues) => void;
  data: IssuerDetailsResponse;
  mutateState: {
    isUpdateError: boolean;
    isUpdateLoading: boolean;
  };
};

const NAMESPACE_TRANSLATION_VALIDATION = "FormValidation";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function SignupForm({
  onSubmit,
  data,
  mutateState,
}: SignupFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        password: yup
          .string()
          .required(tValidation("passwordRequiredInvalid"))
          .min(
            VALIDATION_PASSWORD_LENGTH,
            tValidation("passwordLengthInvalid", {
              length: VALIDATION_PASSWORD_LENGTH,
            })
          )
          .matches(
            VALIDATION_PASSWORD_FORMAT,
            tValidation("passwordFormatInvalid")
          ),
        confirmPassword: yup
          .string()
          .required(tValidation("confirmPasswordRequiredInvalid"))
          .oneOf(
            [yup.ref("password"), ""],
            tValidation("confirmPasswordMatchInvalid")
          ),
        tscs: yup
          .bool()
          .oneOf([true], tValidation("tscsRequiredInvalid"))
          .required(tValidation("tscsRequiredInvalid")),
      }),
    []
  );

  const handleFormSubmit = (data: SignupFormValues) => {
    if (recaptchaRef.current) {
      if (recaptchaRef.current.getValue()) {
        setRecaptchaError("");
        onSubmit(data);
      } else {
        setRecaptchaError(tValidation("recaptchaError"));
      }
    }
  };

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

  const commonInputProps = {
    disabled: mutateState.isUpdateLoading,
  };

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
        <FormHeader icon={<HubIcon />}>
          {tSignup("title")} {data?.name}
        </FormHeader>
        <FormBody>
          {mutateState.isUpdateError && (
            <Alert color="error">{tSignup("submitError")}</Alert>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl
                error={!!errors.password}
                variant="standard"
                fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tSignup("passwordPlaceholder")}
                  aria-label={tSignup("password")}
                  label={<>{tSignup("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("togglePasswordAriaLabel"),
                  }}
                  {...commonInputProps}
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
                  placeholder={tSignup("confirmPasswordPlaceholder")}
                  aria-label={tSignup("confirmPassword")}
                  label={<>{tSignup("confirmPassword")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("toggleConfirmPasswordAriaLabel"),
                  }}
                  {...commonInputProps}
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
                  aria-label={tSignup("agreeTermsAndConditions")}
                  {...commonInputProps}
                />
                {errors.tscs && (
                  <FormHelperText>{errors.tscs.message}</FormHelperText>
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
            loading={mutateState.isUpdateLoading}>
            {tSignup("signupButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
