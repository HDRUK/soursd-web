"use client";

import ContactLink from "@/components/ContactLink";
import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import { Message } from "@/components/Message";
import yup from "@/config/yup";
import { FormMutateState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface SignupFormContactsValues {
  dpo_name?: string;
  dpo_email?: string;
  hr_name?: string;
  hr_email?: string;
}

export interface SignupFormContactsProps {
  mutateState: FormMutateState;
  onSubmit: (data: SignupFormContactsValues) => void;
  onPrevious: (data: SignupFormContactsValues) => void;
  defaultValues?: SignupFormContactsValues;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupFormContacts";

export default function SignupFormContacts({
  onSubmit,
  onPrevious,
  defaultValues,
  mutateState,
}: SignupFormContactsProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();
  const [emptyError, setEmptyError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        dpo_name: yup.string(),
        dpo_email: yup.string().email(tValidation("emailFormatInvalid")),
        hr_name: yup.string(),
        hr_email: yup.string().email(tValidation("emailFormatInvalid")),
      }),
    []
  );

  const validateSubmit = useCallback((values: SignupFormContactsValues) => {
    if (
      Object.keys(values).find(
        (key: string) => !!values[key as keyof SignupFormContactsValues]
      )
    ) {
      setEmptyError(null);
      onSubmit(values);
    } else {
      setEmptyError(tSignup("emptyFieldsError"));
    }
  }, []);

  const methods = useForm<SignupFormContactsValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      dpo_name: "",
      dpo_email: "",
      hr_name: "",
      hr_email: "",
    },
  });

  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(validateSubmit)}
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
          {emptyError && (
            <Message severity="error" sx={{ mb: 3 }}>
              {emptyError}
            </Message>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.hr_name} size="small" fullWidth>
                <TextField
                  {...register("hr_name")}
                  size="small"
                  placeholder={tSignup("hrNamePlaceholder")}
                  label={<>{tSignup("hrName")}</>}
                />
                {errors.hr_name && (
                  <FormHelperText>{errors.hr_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.hr_email} size="small" fullWidth>
                <TextField
                  {...register("hr_email")}
                  size="small"
                  placeholder={tSignup("hrEmailPlaceholder")}
                  label={<>{tSignup("hrEmail")}</>}
                />
                {errors.hr_email && (
                  <FormHelperText>{errors.hr_email.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.dpo_name} size="small" fullWidth>
                <TextField
                  {...register("dpo_name")}
                  size="small"
                  placeholder={tSignup("dpoNamePlaceholder")}
                  label={<>{tSignup("dpoName")}</>}
                />
                {errors.dpo_name && (
                  <FormHelperText>{errors.dpo_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.dpo_email} size="small" fullWidth>
                <TextField
                  {...register("dpo_email")}
                  size="small"
                  placeholder={tSignup("dpoEmailPlaceholder")}
                  label={<>{tSignup("dpoEmail")}</>}
                />
                {errors.hr_email && (
                  <FormHelperText>{errors.hr_email.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </FormBody>
        <FormActions>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => onPrevious(getValues())}
            sx={{ mb: 1 }}>
            {tSignup("previousButton")}
          </Button>
          <LoadingButton
            loading={mutateState.isLoading}
            type="submit"
            variant="contained"
            fullWidth>
            {tSignup("signupButton")}
          </LoadingButton>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
