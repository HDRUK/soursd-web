"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import { Message } from "@/components/Message";
import PasswordTextField from "@/components/PasswordTextField";
import yup from "@/config/yup";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface LoginFormValues {
  email: string;
  password: string;
}

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  mutateState: FormMutateState;
};

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_LOGIN_FORM = "LoginForm";

export default function SignupForm({ onSubmit, mutateState }: LoginFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tLogin = useTranslations(NAMESPACE_TRANSLATION_LOGIN_FORM);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required(tForm("emailRequiredInvalid")),
        password: yup.string().required(tForm("passwordRequiredInvalid")),
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
              {tLogin.rich(mutateState.error, {
                contactLink: ContactLink,
              })}
            </Message>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.email} size="small" fullWidth>
                <TextField
                  id="email"
                  size="small"
                  placeholder={tForm("emailPlaceholder")}
                  aria-label={tForm("email")}
                  label={<>{tForm("email")} *</>}
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
                  placeholder={tForm("passwordPlaceholder")}
                  aria-label={tForm("password")}
                  label={<>{tForm("password")} *</>}
                  iconButtonProps={{
                    "aria-label": tForm("togglePasswordAriaLabel"),
                  }}
                  {...register("password")}
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
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
            {tLogin("loginButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
