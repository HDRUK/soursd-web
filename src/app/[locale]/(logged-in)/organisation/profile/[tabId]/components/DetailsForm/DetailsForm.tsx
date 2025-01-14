"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
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
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";

export interface DetailsFormValues {
  organisation_name: string;
  address_1: string;
  address_2?: string | null;
  town: string;
  county: string;
  country: string;
  postcode: string;
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
  website: string;
  smb_status?: boolean;
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
        sector_id: yup.number().required(tForm("sectorIdRequiredInvalid")),
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
          .required(tForm("companiesHouseNoRequiredInvalid"))
          .matches(
            VALIDATION_COMPANY_NUMBER,
            tForm("companiesHouseNoFormatInvalid")
          ),
        smb_status: yup.boolean(),
      }),
    []
  );

  const handleChange = (
    address: AddressFields,
    setValue: UseFormSetValue<DetailsFormValues>
  ) => {
    const { postcode, addressLine1, addressLine2, town, county, country } =
      address;

    setValue("address_1", addressLine1 ?? "");
    setValue("address_2", addressLine2 ?? "");
    setValue("town", town ?? "");
    setValue("county", county ?? "");
    setValue("country", country ?? "");
    setValue("postcode", postcode ?? "");
  };

  const { isError, error, isLoading } = queryState;

  const formOptions = {
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
    error:
      isError &&
      tProfile.rich(error, {
        contactLink: ContactLink,
      }),
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} {...formOptions}>
      {({ formState: { errors }, register, watch, setValue }) => (
        <>
          <FormSection heading="Organisation name and location">
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="organisation_name"
                  error={errors.organisation_name}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <GoogleAutocomplete
                  textFieldProps={{ variant: "filled", size: "small" }}
                  onChange={(_, address) => handleChange(address, setValue)}
                  placeholder="Search for your address..."
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="address_1"
                  error={errors.address_1}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="address_2"
                  error={errors.address_2}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="town"
                  error={errors.town}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="county"
                  error={errors.county}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="country"
                  error={errors.country}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="postcode"
                  error={errors.postcode}
                  renderField={fieldProps => (
                    <FormField
                      component={TextField}
                      {...fieldProps}
                      sx={{ maxWidth: "200px" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormSection heading="Organisation persistent identifiers">
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="companies_house_no"
                  error={errors.companies_house_no}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="charity_registration_id"
                  error={errors.charity_registration_id}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="ror_id"
                  error={errors.ror_id}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormSection heading="Organisation sector, site and website">
            <Grid item xs={12}>
              <FormControlHorizontal
                id="sector_id"
                error={errors.sector_id}
                renderField={() => (
                  <Select
                    defaultValue={organisation?.sector_id}
                    {...register("sector_id")}
                    inputProps={{
                      "aria-label": tForm("sectorIdAriaLabel"),
                    }}>
                    {sectors?.map(({ name, id }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Grid item xs={12}>
                <FormControlHorizontal
                  label={tForm("smbStatus")}
                  renderField={() => (
                    <FormControlLabel
                      label={tForm("smbStatusDescription")}
                      control={
                        <Checkbox
                          {...register("smb_status")}
                          checked={!!watch("smb_status")}
                        />
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="website"
                  error={errors.website}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              loading={isLoading}
              type="submit"
              endIcon={<SaveIcon />}>
              {tProfile("submitButton")}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
