"use client";

import Form from "@/components/Form/Form";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import GoogleAutocomplete, {
  AddressFields,
} from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import {
  VALIDATION_CHARITY_ID,
  VALIDATION_COMPANY_NUMBER,
  VALIDATION_ROR_ID,
  VALIDATION_URL,
} from "@/consts/form";
import { useStore } from "@/data/store";
import { QueryState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface DetailsFormValues {
  organisation_name: string;
  address_1: string;
  address_2: string;
  town: string;
  county: string;
  country: string;
  postcode: string;
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
  website: string;
  smb_status: boolean;
}

export interface DetailsFormProps {
  onSubmit: (fields: DetailsFormValues) => void;
  queryState: QueryState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function DetailsForm({
  onSubmit,
  queryState,
}: DetailsFormProps) {
  const { organisation, sectors } = useStore(state => state.config);

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        organisation_name: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        address_1: yup.string().required(tForm("address1RequiredInvalid")),
        address_2: yup.string().nullable(),
        town: yup.string().required(tForm("townRequiredInvalid")),
        county: yup.string().required(tForm("countyRequiredInvalid")),
        country: yup.string().required(tForm("countryRequiredInvalid")),
        postcode: yup.string().required(tForm("postcodeRequiredInvalid")),
        sector_id: yup.string().required(tForm("sectorRequiredInvalid")),
        charity_registration_id: yup
          .string()
          .required(tForm("charityRegistrationIdRequiredInvalid"))
          .matches(
            VALIDATION_CHARITY_ID,
            tForm("charityRegistrationIdFormatInvalid")
          ),
        ror_id: yup
          .string()
          .required(tForm("rorIdRequiredInvalid"))
          .matches(VALIDATION_ROR_ID, tForm("rorIdFormatInvalid")),
        website: yup
          .string()
          .required(tForm("websiteRequiredInvalid"))
          .matches(VALIDATION_URL, tForm("websiteFormatInvalid")),
        companies_house_no: yup
          .string()
          .required(tForm("companiesHouseNumberRequiredInvalid"))
          .matches(
            VALIDATION_COMPANY_NUMBER,
            tForm("companiesHouseNumberFormatInvalid")
          ),
      }),
    []
  );

  const methods = useForm<DetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      organisation_name: organisation?.organisation_name,
      address_1: organisation?.address_1,
      address_2: organisation?.address_2,
      town: organisation?.town,
      county: organisation?.county,
      country: organisation?.country,
      postcode: organisation?.postcode,
      companies_house_no: organisation?.companies_house_no,
      sector_id: organisation?.sector_id,
      charity_registration_id: organisation?.charity_registration_id,
      ror_id: organisation?.ror_id,
      website: organisation?.website,
      smb_status: organisation?.smb_status,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const handleChange = (_, address: AddressFields) => {
    const { postcode, addressLine1, addressLine2, town, county, country } =
      address;

    setValue("address_1", addressLine1 ?? "");
    setValue("address_2", addressLine2 ?? "");
    setValue("town", town ?? "");
    setValue("county", county ?? "");
    setValue("country", country ?? "");
    setValue("postcode", postcode ?? "");
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormSection heading="Organisation name and location">
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("organisationName")}
                error={errors.organisation_name}
                id="organisation_name">
                <TextField
                  {...register("organisation_name")}
                  size="small"
                  placeholder={tForm("organisationNamePlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <GoogleAutocomplete
                textFieldProps={{ variant: "filled", size: "small" }}
                onChange={handleChange}
                placeholder="Search for your address..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("address1")}
                error={errors.address_1}
                id="address_1">
                <TextField
                  {...register("address_1")}
                  placeholder={tForm("address1Placeholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("address2")}
                error={errors.address_2}
                id="address_2">
                <TextField
                  {...register("address_2")}
                  placeholder={tForm("address2Placeholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("town")}
                error={errors.town}
                id="town">
                <TextField
                  {...register("town")}
                  placeholder={tForm("townPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("county")}
                error={errors.county}
                id="county">
                <TextField
                  {...register("county")}
                  placeholder={tForm("countyPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("country")}
                error={errors.county}
                id="country">
                <TextField
                  {...register("country")}
                  placeholder={tForm("countryPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("postcode")}
                error={errors.postcode}
                id="postcode">
                <TextField
                  {...register("postcode")}
                  placeholder={tForm("postcodePlaceholder")}
                  sx={{ maxWidth: "200px" }}
                />
              </FormControlHorizontal>
            </Grid>
          </Grid>
        </FormSection>
        <FormSection heading="Organisation persistent identifiers">
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("companiesHouseNumber")}
                error={errors.companies_house_no}
                id="companies_house_no">
                <TextField
                  {...register("companies_house_no")}
                  placeholder={tForm("companiesHouseNumberPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("charityRegistrationId")}
                error={errors.charity_registration_id}
                id="charity_registration_id">
                <TextField
                  {...register("charity_registration_id")}
                  placeholder={tForm("charityRegistrationIdPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("rorId")}
                error={errors.ror_id}
                id="ror_id">
                <TextField
                  {...register("ror_id")}
                  placeholder={tForm("rorIdPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
          </Grid>
        </FormSection>
        <FormSection heading="Organisation sector, site and website">
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("sector")}
                error={errors.sector_id}
                id="sector_id">
                <Select
                  defaultValue={organisation?.sector_id}
                  {...register("sector_id")}
                  inputProps={{
                    "aria-label": tForm("sectorAriaLabel"),
                  }}>
                  {sectors?.map(({ name, id }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal label={tForm("smbStatus")}>
                <FormControlLabel
                  label={tForm("smbStatusDescription")}
                  control={
                    <Checkbox
                      {...register("smb_status")}
                      checked={!!watch("smb_status")}
                    />
                  }
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("website")}
                error={errors.website}
                id="website">
                <TextField
                  {...register("website")}
                  placeholder={tForm("websitePlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
          </Grid>
        </FormSection>
        <Box sx={{ textAlign: "right" }}>
          <LoadingButton
            loading={queryState.isLoading}
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SaveIcon />}
            sx={{ mt: 5 }}>
            {tProfile("submitButton")}
          </LoadingButton>
        </Box>
      </Form>
    </FormProvider>
  );
}
