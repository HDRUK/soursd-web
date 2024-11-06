"use client";

import FormActions from "@/components/FormActions";
import FormBody from "@/components/FormBody";
import yup from "@/config/yup";
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
import { Controller, FormProvider, useForm } from "react-hook-form";

export interface SignupFormOtherDetailsValues {
  address_1: string;
  address_2?: string | undefined;
  town: string;
  county: string;
  country: string;
  postcode: string;
  dsptk_ods_code: string | null;
  iso_27001_certified?: boolean | undefined;
  ce_certified?: boolean | undefined;
  ce_certification_num?: string | undefined;
}

export interface SignupFormOtherDetailsProps {
  onSubmit: (data: SignupFormOtherDetailsValues) => void;
  onPrevious: (data: SignupFormOtherDetailsValues) => void;
  defaultValues?: SignupFormOtherDetailsValues;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupFormOtherDetails";

export default function SignupFormOtherDetails({
  onSubmit,
  onPrevious,
  defaultValues,
}: SignupFormOtherDetailsProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);

  const theme = useTheme();

  const schema = useMemo(
    () =>
      yup.object().shape({
        address_1: yup.string().required(tForm("address1RequiredInvalid")),
        address_2: yup.string().notRequired(),
        town: yup.string().required(tForm("townRequiredInvalid")),
        county: yup.string().required(tForm("countyRequiredInvalid")),
        country: yup.string().required(tForm("countryRequiredInvalid")),
        postcode: yup
          .string()
          .required(tForm("postcodeRequiredInvalid"))
          .matches(VALIDATION_POSTCODE_FORMAT, tForm("postcodeFormatInvalid")),
        dsptk_ods_code: yup
          .string()
          .nullable()
          .transform(value => (value === "" ? null : value))
          .matches(
            VALIDATION_POSTCODE_FORMAT,
            tForm("digitalToolkitCodeFormatInvalid")
          )
          .default(() => ""),
        iso_27001_certified: yup.bool().notRequired(),
        ce_certified: yup.bool(),
        ce_certification_num: yup.string().when("ce_certified", {
          is: true,
          then: () =>
            yup
              .string()
              .required(tForm("ceCertificationNumberRequiredInvalid"))
              .matches(
                VALIDATION_CE_CERTIFICATION_NUMBER,
                tForm("ceCertificationNumberFormatInvalid")
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
                  placeholder={tForm("address1Placeholder")}
                  label={<>{tForm("address1")}</>}
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
                  placeholder={tForm("address2Placeholder")}
                  label={<>{tForm("address2")}</>}
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
                  placeholder={tForm("townPlaceholder")}
                  label={<>{tForm("town")}</>}
                />
                {errors.town && (
                  <FormHelperText>{errors.town.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl error={!!errors.county} size="small" fullWidth>
                    <TextField
                      {...register("county")}
                      size="small"
                      placeholder={tForm("countyPlaceholder")}
                      label={<>{tForm("county")}</>}
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
                      placeholder={tForm("postcodePlaceholder")}
                      label={<>{tForm("postcode")}</>}
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
                  placeholder={tForm("countryPlaceholder")}
                  label={<>{tForm("country")}</>}
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
                    placeholder={tForm("digitalToolkitCodePlaceholder")}
                    label={<>{tForm("digitalToolkitCode")}</>}
                  />
                  <Tooltip title={tForm("whatIsDpstkOdsCode")}>
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
                  control={
                    <Controller
                      name="iso_27001_certified"
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label={tForm("iso27001Certified")}
                />
                {errors.iso_27001_certified && (
                  <FormHelperText>
                    {errors.iso_27001_certified.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={!!errors.ce_certified} size="small" fullWidth>
                <FormControlLabel
                  control={
                    <Controller
                      name="ce_certified"
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                      )}
                    />
                  }
                  label={tForm("ceCertified")}
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
                    placeholder={tForm("ceCertificationNumberPlaceholder")}
                    label={<>{tForm("ceCertificationNumber")}</>}
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
