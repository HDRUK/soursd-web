"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import FormRecaptcha from "@/components/FormRecaptcha";
import PasswordTextField from "@/components/PasswordTextField";
import {
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_LENGTH,
} from "@/consts/form";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
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

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  tscs: boolean;
}

export interface SignupFormProps {
  mutateState: FormMutateState;
  onSubmit: (data: SignupFormValues) => void;
}

const NAMESPACE_TRANSLATION_VALIDATION = "FormValidation";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function SignupForm({ onSubmit, mutateState }: SignupFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();
  const [recaptchaError, setRecaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup
          .string()
          .required(tValidation("firstNameRequiredInvalid")),
        lastName: yup.string().required(tValidation("lastNameRequiredInvalid")),
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
      firstName: "",
      lastName: "",
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
          {mutateState.isError && (
            <Alert color="error" sx={{ mb: 3 }}>
              {tSignup.rich(mutateState.error, {
                contactLink: ContactLink,
              })}
            </Alert>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl
                error={!!errors.firstName}
                variant="standard"
                fullWidth>
                <TextField
                  {...register("firstName")}
                  size="small"
                  placeholder={tSignup("firstNamePlaceholder")}
                  aria-label={tSignup("firstName")}
                  label={<>{tSignup("firstName")} *</>}
                />
                {errors.firstName && (
                  <FormHelperText>{errors.firstName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.lastName}
                variant="standard"
                fullWidth>
                <TextField
                  {...register("lastName")}
                  size="small"
                  placeholder={tSignup("lastNamePlaceholder")}
                  aria-label={tSignup("lastName")}
                  label={<>{tSignup("lastName")} *</>}
                />
                {errors.lastName && (
                  <FormHelperText>{errors.lastName.message}</FormHelperText>
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
                  placeholder={tSignup("passwordPlaceholder")}
                  aria-label={tSignup("password")}
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth>
            {tSignup("signupButton")}
          </Button>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
