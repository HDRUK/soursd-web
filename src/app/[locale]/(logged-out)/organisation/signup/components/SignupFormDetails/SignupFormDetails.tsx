"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import yup from "@/config/yup";
import { VALIDATION_COMPANY_NUMBER } from "@/consts/form";
import { useApplicationData } from "@/context/ApplicationData";
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
import { Controller, FormProvider, useForm } from "react-hook-form";

export interface SignupFormDetailsValues {
  organisation_name: string;
  lead_applicant_organisation_email: string;
  first_name: string;
  last_name: string;
  password?: string | undefined;
  confirm_password: string;
  tscs: NonNullable<boolean | undefined>;
  companies_house_no: string;
}

export interface SignupFormDetailsProps {
  onSubmit: (data: SignupFormDetailsValues) => void;
  defaultValues?: SignupFormDetailsValues;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupFormDetails";

export default function SignupFormDetails({
  onSubmit,
  defaultValues,
}: SignupFormDetailsProps) {
  const {
    validationSchema: { password },
  } = useApplicationData();
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
        companies_house_no: yup
          .string()
          .required(tValidation("companyNumberRequiredInvalid"))
          .matches(
            VALIDATION_COMPANY_NUMBER,
            tValidation("companyNumberFormatInvalid")
          ),
        organisation_name: yup
          .string()
          .required(tValidation("organisationNameRequiredInvalid")),
        first_name: yup
          .string()
          .required(tValidation("firstNameRequiredInvalid")),
        last_name: yup
          .string()
          .required(tValidation("lastNameRequiredInvalid")),
        password: yup
          .string()
          .required(tValidation("passwordRequiredInvalid"))
          .testLengthBetween(
            { minLength: password.minLength, maxLength: password.maxLength },
            tValidation("passwordLengthInvalid", {
              minLength: password.minLength,
              maxLength: password.maxLength,
            })
          ),
        confirm_password: yup
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
    defaultValues,
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
                  label={<>{tSignup("organisationName")} *</>}
                />
                {errors.organisation_name && (
                  <FormHelperText>
                    {errors.organisation_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.companies_house_no}
                size="small"
                fullWidth>
                <TextField
                  {...register("companies_house_no")}
                  size="small"
                  placeholder={tSignup("companyNumberPlaceholder")}
                  label={<>{tSignup("companyNumber")} *</>}
                />
                {errors.companies_house_no && (
                  <FormHelperText>
                    {errors.companies_house_no.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.lead_applicant_organisation_email}
                size="small"
                fullWidth>
                <TextField
                  {...register("lead_applicant_organisation_email")}
                  size="small"
                  placeholder={tSignup("emailPlaceholder")}
                  label={<>{tSignup("email")} *</>}
                />
                {errors.lead_applicant_organisation_email && (
                  <FormHelperText>
                    {errors.lead_applicant_organisation_email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl
                    error={!!errors.first_name}
                    size="small"
                    fullWidth>
                    <TextField
                      {...register("first_name")}
                      size="small"
                      placeholder={tSignup("applicantFirstNamePlaceholder")}
                      label={<>{tSignup("applicantFirstName")} *</>}
                    />
                    {errors.first_name && (
                      <FormHelperText>
                        {errors.first_name.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    error={!!errors.last_name}
                    size="small"
                    fullWidth>
                    <TextField
                      {...register("last_name")}
                      size="small"
                      placeholder={tSignup("applicantLastNamePlaceholder")}
                      label={<>{tSignup("applicantLastName")} *</>}
                    />
                    {errors.last_name && (
                      <FormHelperText>
                        {errors.last_name.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.password} size="small" fullWidth>
                <PasswordTextField
                  id="password"
                  size="small"
                  placeholder={tSignup("passwordPlaceholder")}
                  label={<>{tSignup("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("togglePasswordAriaLabel"),
                  }}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.confirm_password}
                size="small"
                fullWidth>
                <PasswordTextField
                  id="confirm_password"
                  size="small"
                  placeholder={tSignup("confirmPasswordPlaceholder")}
                  label={<>{tSignup("confirmPassword")} *</>}
                  iconButtonProps={{
                    "aria-label": tSignup("toggleConfirmPasswordAriaLabel"),
                  }}
                />
                {errors.confirm_password && (
                  <FormHelperText>
                    {errors.confirm_password.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.tscs} size="small" fullWidth>
                <FormControlLabel
                  control={
                    <Controller
                      name="tscs"
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
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
