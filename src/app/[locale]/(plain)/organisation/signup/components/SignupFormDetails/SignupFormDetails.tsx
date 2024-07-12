"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import {
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_LENGTH,
} from "@/consts/form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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

export interface SignupFormDetailsValues {
  organisation_name: string;
  lead_applicant_organisation_email: string;
  lead_applicant_organisation_name: string;
  password: string;
  confirmPassword: string;
  tscs: boolean;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormDetailsValues) => void;
  defaultEmail?: string;
  defaultValues?: SignupFormDetailsValues;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupFormDetails";

export default function SignupForm({
  onSubmit,
  defaultEmail,
  defaultValues,
}: SignupFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        lead_applicant_organisation_email: yup
          .string()
          .required(tValidation("emailRequiredInvalid"))
          .email(tValidation("emailFormatInvalid")),
        organisation_name: yup
          .string()
          .required(tValidation("applicantNameRequiredInvalid")),
        lead_applicant_organisation_name: yup
          .string()
          .required(tValidation("applicantNameRequiredInvalid")),
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

  const handleFormSubmit = (data: SignupFormDetailsValues) => {
    if (recaptchaRef.current) {
      if (recaptchaRef.current.getValue()) {
        setRecaptchaError("");
        onSubmit(data);
      } else {
        setRecaptchaError(tValidation("recaptchaError"));
      }
    }
  };

  const methods = useForm<SignupFormDetailsValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      organisation_name: "",
      lead_applicant_organisation_email: defaultEmail,
      lead_applicant_organisation_name: "",
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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl
                error={!!errors.organisation_name}
                size="small"
                fullWidth>
                <TextField
                  {...register("organisation_name")}
                  size="small"
                  placeholder={tSignup("organisationNamePlaceholder")}
                  aria-label={tSignup("organisationName")}
                  label={<>{tSignup("organisationName")} *</>}
                />
                {errors.organisation_name && (
                  <FormHelperText>
                    {errors.organisation_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {!defaultEmail && (
              <Grid item>
                <FormControl
                  error={!!errors.lead_applicant_organisation_email}
                  size="small"
                  fullWidth>
                  <TextField
                    {...register("lead_applicant_organisation_email")}
                    size="small"
                    placeholder={tSignup("emailPlaceholder")}
                    aria-label={tSignup("email")}
                    label={<>{tSignup("email")} *</>}
                  />
                  {errors.lead_applicant_organisation_email && (
                    <FormHelperText>
                      {errors.lead_applicant_organisation_email.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl
                error={!!errors.lead_applicant_organisation_name}
                size="small"
                fullWidth>
                <TextField
                  {...register("lead_applicant_organisation_name")}
                  size="small"
                  placeholder={tSignup("applicantNamePlaceholder")}
                  aria-label={tSignup("applicantName")}
                  label={<>{tSignup("applicantName")} *</>}
                />
                {errors.lead_applicant_organisation_name && (
                  <FormHelperText>
                    {errors.lead_applicant_organisation_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.password} size="small" fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tValidation("passwordPlaceholder")}
                  aria-label={tValidation("password")}
                  label={<>{tValidation("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tValidation("togglePasswordAriaLabel"),
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
                  placeholder={tValidation("confirmPasswordPlaceholder")}
                  aria-label={tValidation("confirmPassword")}
                  label={<>{tValidation("confirmPassword")} *</>}
                  iconButtonProps={{
                    "aria-label": tValidation("toggleConfirmPasswordAriaLabel"),
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
                  label={tSignup("agreeTermsAndConditions")}
                  aria-label={tSignup("agreeTermsAndConditionsAriaLabel")}
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
          <Button type="submit" variant="contained" fullWidth>
            {tSignup("nextButton")}
          </Button>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
