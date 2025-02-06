"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import Text from "@/components/Text";
import yup from "@/config/yup";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { putUserQuery } from "@/services/users";
import EastIcon from "@mui/icons-material/East";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  ,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  orc_id?: string | null;
  consent_scrape?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Identity() {
  const router = useRouter();
  const user = useStore(state => state.config.user);

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const updateUser = useMutation(putUserQuery(user?.id));

  const handleDetailsSubmit = useCallback(
    async (fields: IdentityFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...fields,
        };

        await updateUser.mutateAsync(request);
      }
    },
    [user]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
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

  const error =
    updateUser.isError &&
    tProfile.rich(updateUser.error, {
      contactLink: ContactLink,
    });

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      orc_id: user?.orc_id,
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
              loading={updateUser.isPending}>
              {tProfile("submitButton")}
            </LoadingButton>
          </FormActions>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              sx={{ display: "flex" }}
              endIcon={<EastIcon />}
              onClick={() =>
                router.push(ROUTES.profileResearcherAffiliations.path)
              }>
              {tProfile("continueLinkText")}
            </LoadingButton>
          </Box>
        </>
      </Form>
    </PageGuidance>
  );
}
