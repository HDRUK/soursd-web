"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
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
import { AddressFields } from "@/types/application";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

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

  function isFieldRequired(
    schema: yup.AnyObjectSchema,
    fieldName: string
  ): boolean {
    return !(schema.describe().fields[fieldName] as SchemaDescription)
      ?.optional;
  }

  return (
    <Form schema={schema} onSubmit={onSubmit} {...formOptions}>
      {({ setValue }) => {
        const handleFindAddress = (address: AddressFields) => {
          Object.entries(address).forEach(([key, value]) => {
            setValue(key as keyof DetailsFormValues, value ?? "");
          });
        };

        return (
          <>
            <FormSection heading="Organisation name and location">
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="organisation_name"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="address"
                    displayPlaceholder={false}
                    displayLabel={false}
                    renderField={() => (
                      <GoogleAutocomplete
                        name="address"
                        textFieldProps={{ variant: "filled", size: "small" }}
                        onAddressSelected={value =>
                          handleFindAddress(value as AddressFields)
                        }
                        placeholder="Search for your address..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="address_1"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="address_2"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="town"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="county"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="country"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="postcode"
                    renderField={fieldProps => (
                      <TextField {...fieldProps} sx={{ maxWidth: "200px" }} />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
            <FormSection heading="Organisation persistent identifiers">
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="companies_house_no"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="charity_registration_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="ror_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </Grid>
            </FormSection>
            <FormSection heading="Organisation sector, site and website">
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="sector_id"
                  renderField={fieldProps => (
                    <Select
                      {...fieldProps}
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
                    name="smbStatus"
                    displayPlaceholder={false}
                    label={tForm("smbStatus")}
                    renderField={fieldProps => (
                      <FormControlLabel
                        label={tForm("smbStatusDescription")}
                        control={
                          <Checkbox
                            {...fieldProps}
                            checked={!!fieldProps.value}
                          />
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="website"
                    renderField={fieldProps => <TextField {...fieldProps} />}
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
        );
      }}
    </Form>
  );
}
