"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import {
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_POSTCODE_FORMAT,
} from "@/consts/form";
import { yupResolver } from "@hookform/resolvers/yup";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export interface SignupFormOtherDetailsValues {
  address_1: string;
  address_2: string;
  town: string;
  county: string;
  country: string;
  postcode: string;
  dsptk_ods_code: string;
  iso_27001_certified: boolean;
  ce_certified: boolean;
  ce_certification_num: string;
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
        address_1: yup
          .string()
          .required(tValidation("address1RequiredInvalid")),
        address_2: yup.string().notRequired(),
        town: yup.string().notRequired(),
        county: yup.string().notRequired(),
        country: yup.string().notRequired(),
        postcode: yup
          .string()
          .required(tValidation("postcodeRequiredInvalid"))
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tValidation("postcodeFormatInvalid")
          ),
        dsptk_ods_code: yup
          .string()
          .nullable()
          .transform(value => (value === "" ? null : value))
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tValidation("digitalToolkitCodeFormatInvalid")
          )
          .default(() => ""),
        iso_27001_certified: yup.bool().notRequired(),
        ce_certified: yup.bool(),
        ce_certification_num: yup.string().when("ce_certified", {
          is: true,
          then: () =>
            yup
              .string()
              .required(tValidation("ceCertificationNumberRequiredInvalid"))
              .matches(
                VALIDATION_CE_CERTIFICATION_NUMBER,
                tValidation("ceCertificationNumberFormatInvalid")
              ),
        }),
      }),
    []
  );

  const methods = useForm<SignupFormOtherDetailsValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    watch,
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = methods;

  const ceCertifiedValue = watch("ce_certified");

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
              <FormControl error={!!errors.address_1} size="small" fullWidth>
                <TextField
                  {...register("address_1")}
                  size="small"
                  placeholder={tSignup("address1Placeholder")}
                  aria-label={tSignup("address1")}
                  label={<>{tSignup("address1")} *</>}
                />
                {errors.address_1 && (
                  <FormHelperText>{errors.address_1.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.address_2} size="small" fullWidth>
                <TextField
                  {...register("address_2")}
                  size="small"
                  placeholder={tSignup("address2Placeholder")}
                  aria-label={tSignup("address2")}
                  label={<>{tSignup("address2")}</>}
                />
                {errors.address_2 && (
                  <FormHelperText>{errors.address_2.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.town} size="small" fullWidth>
                <TextField
                  {...register("town")}
                  size="small"
                  placeholder={tSignup("townPlaceholder")}
                  aria-label={tSignup("town")}
                  label={<>{tSignup("town")}</>}
                />
                {errors.town && (
                  <FormHelperText>{errors.town.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} xs={12}>
                <Grid item xs={12} md={6}>
                  <FormControl error={!!errors.county} size="small" fullWidth>
                    <TextField
                      {...register("county")}
                      size="small"
                      placeholder={tSignup("countyPlaceholder")}
                      aria-label={tSignup("county")}
                      label={<>{tSignup("county")}</>}
                    />
                    {errors.county && (
                      <FormHelperText>{errors.county.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
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
              </Grid>
            </Grid>
            <Grid item>
              <FormControl error={!!errors.country} size="small" fullWidth>
                <TextField
                  {...register("country")}
                  size="small"
                  placeholder={tSignup("countryPlaceholder")}
                  aria-label={tSignup("country")}
                  label={<>{tSignup("country")} *</>}
                  disabled
                />
                {errors.country && (
                  <FormHelperText>{errors.country.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.dsptk_ods_code}
                size="small"
                fullWidth>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TextField
                    {...register("dsptk_ods_code")}
                    size="small"
                    placeholder={tSignup("digitalToolkitCodePlaceholder")}
                    aria-label={tSignup("digitalToolkitCode")}
                    label={<>{tSignup("digitalToolkitCode")}</>}
                  />
                  <Tooltip title={tSignup("whatIsDpstkOdsCode")}>
                    <InfoIcon color="info" />
                  </Tooltip>
                </Box>
                {errors.dsptk_ods_code && (
                  <FormHelperText>
                    {errors.dsptk_ods_code.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl
                error={!!errors.iso_27001_certified}
                size="small"
                fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("iso_27001_certified")} />}
                  label={tSignup("iso27001Certified")}
                  aria-label={tSignup("iso27001CertifiedAriaLabel")}
                />
                {errors.iso_27001_certified && (
                  <FormHelperText>
                    {errors.iso_27001_certified.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={!!errors.ce_certified} size="small" fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("ce_certified")} />}
                  label={tSignup("ceCertified")}
                  aria-label={tSignup("ceCertifiedAriaLabel")}
                />
                {errors.ce_certified && (
                  <FormHelperText>{errors.ce_certified.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {!!ceCertifiedValue && (
              <Grid item>
                <FormControl
                  error={!!errors.ce_certification_num}
                  size="small"
                  fullWidth>
                  <TextField
                    {...register("ce_certification_num")}
                    size="small"
                    placeholder={tSignup("ceCertificationNumberPlaceholder")}
                    aria-label={tSignup("ceCertificationNumber")}
                    label={<>{tSignup("ceCertificationNumber")} *</>}
                  />
                  {errors.ce_certification_num && (
                    <FormHelperText>
                      {errors.ce_certification_num.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
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
