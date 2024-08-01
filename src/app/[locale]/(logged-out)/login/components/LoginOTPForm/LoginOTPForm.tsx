"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import PasswordTextField from "@/components/PasswordTextField";
import { VALIDATION_OTP_PASSCODE_LENGTH } from "@/consts/form";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Refresh } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import yup from "@/config/yup";

export interface LoginOTPFormValues {
  otp: string;
}

export type LoginOTPFormProps = {
  onSubmit: (values: LoginOTPFormValues) => void;
  onClickResend: () => void;
  mutateState: FormMutateState;
};

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_LOGIN = "LoginOTPForm";

export default function LoginOTPForm({
  onSubmit,
  onClickResend,
  mutateState,
}: LoginOTPFormProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tLogin = useTranslations(NAMESPACE_TRANSLATION_LOGIN);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        otp: yup
          .string()
          .required(tValidation("otpPasscodeRequiredInvalid"))
          .length(
            VALIDATION_OTP_PASSCODE_LENGTH,
            tValidation("otpPasscodeLengthInvalid", {
              length: VALIDATION_OTP_PASSCODE_LENGTH,
            })
          ),
      }),
    []
  );

  const methods = useForm<LoginOTPFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "auto",
          [".MuiGrid-root .MuiGrid-item"]: {
            maxWidth: "100%",
          },
          [theme.breakpoints.up("md")]: { width: "350px" },
        }}>
        <FormBody>
          <Alert color="info" sx={{ mb: 3 }}>
            {tLogin("checkYourEmail")}
          </Alert>
          {mutateState.isError && (
            <Alert color="error" sx={{ mb: 3 }}>
              {tLogin("submitError")}
            </Alert>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <FormControl error={!!errors.otp} variant="standard" fullWidth>
                  <PasswordTextField
                    id="otp"
                    size="small"
                    placeholder={tLogin("otpPlaceholder")}
                    aria-label={tLogin("otp")}
                    label={<>{tLogin("otp")} *</>}
                    iconButtonProps={{
                      "aria-label": tLogin("toggleOtpAriaLabel"),
                    }}
                    {...register("otp")}
                  />

                  {errors.otp && (
                    <FormHelperText>{errors.otp.message}</FormHelperText>
                  )}
                </FormControl>
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                  aria-label={tLogin("loginResendAriaLabel")}
                  onClick={onClickResend}>
                  <Refresh />
                </IconButton>
              </Box>
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
            {tLogin("submitButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
