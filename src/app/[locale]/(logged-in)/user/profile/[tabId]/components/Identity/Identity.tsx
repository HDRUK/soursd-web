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
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { putUserQuery } from "@/services/users";
import { showAlert } from "@/utils/showAlert";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import ReactDOMServer from "react-dom/server";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  personal_email: string;
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

  const updateUser = useMutation(putUserQuery(2));

  const handleDetailsSubmit = useCallback(
    async (fields: IdentityFormValues) => {
      try {
        if (user?.id) {
          const request = {
            ...user,
            ...fields,
            email: fields.personal_email,
          };

          await updateUser.mutateAsync(request);
        }

        showAlert("success", {
          text: tProfile("postUserSuccess"),
          confirmButtonText: tProfile("postUserSuccessButton"),
          preConfirm: () => {
            router.push(ROUTES.profileResearcherAffiliations.path);
          },
        });
      } catch (_) {
        showAlert("error", {
          text: ReactDOMServer.renderToString(
            tProfile.rich("postUserError", {
              contactLink: ContactLink,
            })
          ),
          confirmButtonText: tProfile("postUserErrorButton"),
        });
      }
    },
    [user]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        personal_email: yup
          .string()
          .email()
          .required(tForm("emailRequiredInvalid")),
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
      personal_email: user?.email,
      orc_id: user?.orc_id,
      consent_scrape: user?.consent_scrape,
    },
    error,
  };

  return (
    <PageBodyContainer heading={tProfile("identityTitle")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <Form
              onSubmit={handleDetailsSubmit}
              schema={schema}
              {...formOptions}>
              <>
                <FormSection heading={tProfile("identityForm")}>
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <FormControlHorizontal
                        name="first_name"
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlHorizontal
                        name="last_name"
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlHorizontal
                        name="personal_email"
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
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
                    {tProfile("submitAndContinueButton")}
                  </LoadingButton>
                </FormActions>
              </>
            </Form>
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
