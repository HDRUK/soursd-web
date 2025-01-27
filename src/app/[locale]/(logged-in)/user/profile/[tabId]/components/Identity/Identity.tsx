"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import OverlayCenter from "@/components/OverlayCenter";
import Text from "@/components/Text";
import yup from "@/config/yup";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useStore } from "@/data/store";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { getOrganisations } from "@/services/organisations";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  orc_id?: string | null;
  organisation_id: number;
  consent_scrape?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Identity() {
  const {
    update: updateCompletion,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useUserProfileCompletion();

  const user = useStore(state => state.config.user);

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    isError: isGetOrganisationsError,
    isLoading: isGetOrganisationsLoading,
    data: organisationsData,
    error: organisationsError,
  } = useQuery({
    queryKey: ["getOrganisationsError"],
    queryFn: () =>
      getOrganisations({
        error: { message: "noData" },
      }),
  });

  const handleDetailsSubmit = useCallback(
    async (fields: IdentityFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...fields,
        };

        updateCompletion(
          fields,
          UserProfileCompletionCategories.IDENTITY,
          request
        );
      }
    },
    [user]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        organisation_id: yup
          .number()
          .required(tForm("organisationNameRequiredInvalid")),
        orc_id: yup
          .string()
          .matches(
            new RegExp(`(${VALIDATION_ORC_ID.source})|^$`),
            tForm("orcIdFormatInvalid")
          )
          .when("consent_scrape", {
            is: true,
            then: () =>
              yup
                .string()
                .required(tForm("orcIdRequiredInvalid"))
                .matches(VALIDATION_ORC_ID, tForm("orcIdFormatInvalid")),
          })
          .nullable(),
        consent_scrape: yup.bool(),
      }),
    []
  );

  if (isGetOrganisationsLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  const error =
    (isGetOrganisationsError &&
      tProfile.rich(organisationsError, {
        contactLink: ContactLink,
      })) ||
    (isUpdateError &&
      tProfile.rich(updateError, {
        contactLink: ContactLink,
      }));

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      orc_id: user?.orc_id,
      organisation_id: user?.organisation_id,
      consent_scrape: user?.consent_scrape,
    },
    error,
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions}>
        <>
          <FormSection heading={tProfile("identity")}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="organisation_id"
                  renderField={fieldProps => (
                    <Select
                      {...fieldProps}
                      inputProps={{
                        "aria-label": tForm("organisationNameAriaLabel"),
                      }}>
                      {organisationsData?.data?.data.map(
                        ({ organisation_name, id }) => (
                          <MenuItem value={id} key={id}>
                            {organisation_name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="first_name"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="last_name"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="orc_id"
                  renderField={fieldProps => (
                    <Text
                      endIcon={
                        <Tooltip title={tForm("whatIsTheOrcId")}>
                          <InfoIcon color="info" />
                        </Tooltip>
                      }
                      sx={{ maxWidth: "200px" }}>
                      <TextField {...fieldProps} />
                    </Text>
                  )}
                />
              </Grid>
              <Grid item>
                <FormControlHorizontal
                  name="consent_scrape"
                  renderField={fieldProps => (
                    <FormControlLabel
                      label={tForm("consentScrapeDescription")}
                      control={
                        <Checkbox
                          {...fieldProps}
                          checked={!!fieldProps.value}
                        />
                      }
                      sx={{
                        mb: 2,
                      }}
                    />
                  )}
                  displayLabel={false}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              type="submit"
              endIcon={<SaveIcon />}
              loading={isUpdateLoading}>
              {tProfile("submitButton")}
            </LoadingButton>
          </FormActions>
        </>
      </Form>
    </PageGuidance>
  );
}
