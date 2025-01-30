"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";

import yup from "@/config/yup";
import { VALIDATION_CHARITY_ID, VALIDATION_ROR_ID } from "@/consts/form";
import { useStore } from "@/data/store";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";

export interface DigitalIdentifiersFormValues {
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function DigitalIdentifiers() {
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
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      companies_house_no: organisation?.companies_house_no,
      sector_id: organisation?.sector_id,
      charity_registration_id: organisation?.charity_registration_id,
      ror_id: organisation?.ror_id,
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
