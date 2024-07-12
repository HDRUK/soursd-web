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
  dpoName: string;
  dpoEmail: string;
  hrName: string;
  hrEmail: string;
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
        dpoName: yup.string().required(tValidation("dpoNameRequiredInvalid")),
        dpoEmail: yup
          .string()
          .required(tValidation("dpoEmailRequiredInvalid"))
          .email(tValidation("dpoEmailFormatInvalid")),
        hrName: yup.string().required(tValidation("hroNameRequiredInvalid")),
        hrEmail: yup
          .string()
          .required(tValidation("hrEmailRequiredInvalid"))
          .email(tValidation("hrEmailFormatInvalid")),
      }),
    []
  );

  const methods = useForm<SignupFormContactsValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      dpoName: "",
      dpoEmail: "",
      hrName: "",
      hrEmail: "",
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
              <FormControl error={!!errors.hrName} size="small" fullWidth>
                <TextField
                  {...register("hrName")}
                  size="small"
                  placeholder={tSignup("hrNamePlaceholder")}
                  aria-label={tSignup("hrName")}
                  label={<>{tSignup("hrName")} *</>}
                />
                {errors.hrName && (
                  <FormHelperText>{errors.hrName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.hrEmail} size="small" fullWidth>
                <TextField
                  {...register("hrEmail")}
                  size="small"
                  placeholder={tSignup("hrEmailPlaceholder")}
                  aria-label={tSignup("hrEmail")}
                  label={<>{tSignup("hrEmail")} *</>}
                />
                {errors.hrEmail && (
                  <FormHelperText>{errors.hrEmail.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.dpoName} size="small" fullWidth>
                <TextField
                  {...register("dpoName")}
                  size="small"
                  placeholder={tSignup("dpoNamePlaceholder")}
                  aria-label={tSignup("dpoName")}
                  label={<>{tSignup("dpoName")} *</>}
                />
                {errors.dpoName && (
                  <FormHelperText>{errors.dpoName.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.dpoEmail} size="small" fullWidth>
                <TextField
                  {...register("dpoEmail")}
                  size="small"
                  placeholder={tSignup("dpoEmailPlaceholder")}
                  aria-label={tSignup("dpoEmail")}
                  label={<>{tSignup("dpoEmail")} *</>}
                />
                {errors.hrEmail && (
                  <FormHelperText>{errors.hrEmail.message}</FormHelperText>
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
