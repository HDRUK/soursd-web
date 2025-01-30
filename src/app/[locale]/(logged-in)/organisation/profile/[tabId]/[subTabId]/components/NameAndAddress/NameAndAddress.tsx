"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { AddressFields } from "@/types/application";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";

export interface NameAndAddressFormValues {
  organisation_name: string;
  address_1: string;
  address_2?: string | null;
  town: string;
  county: string;
  country: string;
  postcode: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function NameAndAddress() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

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
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      organisation_name: organisation?.organisation_name,
      address_1: organisation?.address_1,
      address_2: organisation?.address_2,
      town: organisation?.town,
      county: organisation?.county,
      country: organisation?.country,
      postcode: organisation?.postcode,
    },
    error:
      isError &&
      tProfile.rich(error, {
        contactLink: ContactLink,
      }),
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} {...formOptions}>
      {({ setValue }) => {
        const handleFindAddress = (address: AddressFields) => {
          Object.entries(address).forEach(([key, value]) => {
            setValue(key as keyof NameAndAddressFormValues, value ?? "");
          });
        };

        return (
          <>
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
