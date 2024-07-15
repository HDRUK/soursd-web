"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignupFormContactsValues {
  dpo_name: string;
  dpo_email: string;
  hr_name: string;
  hr_email: string;
}

export interface SignupFormContactsProps {
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
}: SignupFormContactsProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        dpo_name: yup.string().required(tValidation("dpoNameRequiredInvalid")),
        dpo_email: yup
          .string()
          .required(tValidation("dpoEmailRequiredInvalid"))
          .email(tValidation("dpoEmailFormatInvalid")),
        hr_name: yup.string().required(tValidation("hroNameRequiredInvalid")),
        hr_email: yup
          .string()
          .required(tValidation("hrEmailRequiredInvalid"))
          .email(tValidation("hrEmailFormatInvalid")),
      }),
    []
  );

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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl error={!!errors.hr_name} size="small" fullWidth>
                <TextField
                  {...register("hr_name")}
                  size="small"
                  placeholder={tSignup("hrNamePlaceholder")}
                  aria-label={tSignup("hrName")}
                  label={<>{tSignup("hrName")} *</>}
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
                  aria-label={tSignup("hrEmail")}
                  label={<>{tSignup("hrEmail")} *</>}
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
                  aria-label={tSignup("dpoName")}
                  label={<>{tSignup("dpoName")} *</>}
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
                  aria-label={tSignup("dpoEmail")}
                  label={<>{tSignup("dpoEmail")} *</>}
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
          <Button type="submit" variant="contained" fullWidth>
            {tSignup("signupButton")}
          </Button>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
