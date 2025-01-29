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
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";

export interface SectorFormValues {
  sector_id: number;
  website: string;
  smb_status?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function SectorSiteAndWebsite() {
  const { organisation, setOrganisation, sectors } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
      sectors: state.config.sectors,
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
        sector_id: yup.number().required(tForm("sectorIdRequiredInvalid")),
        website: yup
          .string()
          .required(tForm("websiteRequiredInvalid"))
          .matches(VALIDATION_URL, tForm("websiteFormatInvalid")),
        smb_status: yup.boolean(),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      sector_id: organisation?.sector_id,
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
      <>
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
                      <Checkbox {...fieldProps} checked={!!fieldProps.value} />
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
    </Form>
  );
}
