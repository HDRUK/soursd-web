"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import {
  VALIDATION_COMPANY_NUMBER,
  VALIDATION_POSTCODE_FORMAT,
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
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignupFormOtherDetailsValues {
  address1: string;
  postcode: string;
  companyNumber: string;
  digitalToolkitCode: string;
  iso27001: boolean;
  ceCertified: boolean;
  ceCertificationNumber: string;
}

export interface SignupFormOtherDetailsProps {
  onSubmit: (data: SignupFormOtherDetailsValues) => void;
  onPrevious: (data: SignupFormOtherDetailsValues) => void;
  defaultValues?: SignupFormOtherDetailsValues;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupFormOtherDetails";

export default function SignupFormOtherDetails({
  onSubmit,
  onPrevious,
  defaultValues,
}: SignupFormOtherDetailsProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        address1: yup.string().required(tValidation("address1RequiredInvalid")),
        postcode: yup
          .string()
          .required(tValidation("postcodeRequiredInvalid"))
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tValidation("postcodeFormatInvalid")
          ),
        companyNumber: yup
          .string()
          .required(tValidation("companyNumberRequiredInvalid"))
          .matches(
            VALIDATION_COMPANY_NUMBER,
            tValidation("companyNumberFormatInvalid")
          ),
        digitalToolkitCode: yup
          .string()
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tValidation("digitalToolkitCodeFormatInvalid")
          ),
        iso27001: yup
          .bool()
          .oneOf([true], tValidation("iso27001RequiredInvalid"))
          .required(tValidation("iso27001RequiredInvalid")),
        ceCertified: yup.bool(),
        ceCertificationNumber: yup
          .string()
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tValidation("ceCertificationNumberFormatInvalid")
          ),
      }),
    []
  );

  const methods = useForm<SignupFormOtherDetailsValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      address1: "",
      postcode: "",
      companyNumber: "",
      digitalToolkitCode: "",
      iso27001: false,
      ceCertified: false,
      ceCertificationNumber: "",
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
              <FormControl error={!!errors.address1} size="small" fullWidth>
                <TextField
                  {...register("address1")}
                  size="small"
                  placeholder={tSignup("address1Placeholder")}
                  aria-label={tSignup("address1")}
                  label={<>{tSignup("address1")} *</>}
                />
                {errors.address1 && (
                  <FormHelperText>{errors.address1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.postcode} size="small" fullWidth>
                <TextField
                  {...register("postcode")}
                  size="small"
                  placeholder={tSignup("postcodePlaceholder")}
                  aria-label={tSignup("postcode")}
                  label={<>{tSignup("postcode")} *</>}
                />
                {errors.postcode && (
                  <FormHelperText>{errors.postcode.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.companyNumber}
                size="small"
                fullWidth>
                <TextField
                  {...register("companyNumber")}
                  size="small"
                  placeholder={tSignup("companyNumberPlaceholder")}
                  aria-label={tSignup("companyNumber")}
                  label={<>{tSignup("companyNumber")} *</>}
                />
                {errors.companyNumber && (
                  <FormHelperText>
                    {errors.companyNumber.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.digitalToolkitCode}
                size="small"
                fullWidth>
                <TextField
                  {...register("digitalToolkitCode")}
                  size="small"
                  placeholder={tSignup("digitalToolkitCodePlaceholder")}
                  aria-label={tSignup("digitalToolkitCode")}
                  label={<>{tSignup("digitalToolkitCode")} *</>}
                />
                {errors.digitalToolkitCode && (
                  <FormHelperText>
                    {errors.digitalToolkitCode.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.iso27001} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("iso27001")} />}
                  label={tSignup("iso27001")}
                  aria-label={tSignup("iso27001AriaLabel")}
                />
                {errors.iso27001 && (
                  <FormHelperText>{errors.iso27001.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.ceCertified} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("ceCertified")} />}
                  label={tSignup("ceCertified")}
                  aria-label={tSignup("ceCertifiedAriaLabel")}
                />
                {errors.ceCertified && (
                  <FormHelperText>{errors.ceCertified.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.ceCertificationNumber}
                size="small"
                fullWidth>
                <TextField
                  {...register("ceCertificationNumber")}
                  size="small"
                  placeholder={tSignup("ceCertificationNumberPlaceholder")}
                  aria-label={tSignup("ceCertificationNumber")}
                  label={<>{tSignup("ceCertificationNumber")} *</>}
                />
                {errors.ceCertificationNumber && (
                  <FormHelperText>
                    {errors.ceCertificationNumber.message}
                  </FormHelperText>
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
            {tSignup("nextButton")}
          </Button>
        </FormActions>
      </Box>
    </FormProvider>
  );
}
