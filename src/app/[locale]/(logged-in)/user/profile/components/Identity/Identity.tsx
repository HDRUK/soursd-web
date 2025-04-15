"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import Markdown from "@/components/Markdown";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import SelectCountry from "@/components/SelectCountry";
import yup from "@/config/yup";
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
import { Button, Grid, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import VeriffTermsAndConditions from "../VeriffTermsAndConditions";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  personal_email: string;
  location: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Identity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useStore(state => state.getUser());

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const updateUser = useMutation(putUserQuery(user?.id));

  const [showModal, setShowModal] = useState(false);

  const handleDetailsSubmit = useCallback(
    async (fields: IdentityFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...fields,
          email: fields.personal_email,
        };

        await updateUser.mutateAsync(request);

        queryClient.refetchQueries({
          queryKey: ["getUser", user.id],
        });
      }
    },
    [user]
  );

  useQueryAlerts(updateUser, {
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        tProfile.rich("postUserError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: tProfile("postUserErrorButton"),
    },
    successAlertProps: {
      text: tProfile("postUserSuccess"),
      confirmButtonText: tProfile("postUserSuccessButton"),
      preConfirm: () => {
        router.push(ROUTES.profileResearcherExperience.path);
      },
    },
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        personal_email: yup
          .string()
          .email()
          .required(tForm("emailRequiredInvalid")),
        location: yup.string().required(tForm("locationRequiredInvalid")),
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
      location: user?.location,
    },
    error,
  };

  return (
    <PageBodyContainer heading={tProfile("identityTitle")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection heading={tProfile("identityForm")}>
            <Form
              onSubmit={handleDetailsSubmit}
              schema={schema}
              canLeave
              key={user?.id}
              {...formOptions}>
              <>
                <FormSection>
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
                        description={tProfile("emailDescription")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlHorizontal
                        name="location"
                        description={tProfile("locationDescription")}
                        renderField={({ value, onChange, ...rest }) => (
                          <SelectCountry
                            useCountryCode={false}
                            value={value}
                            onChange={onChange}
                            {...rest}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </FormSection>
                <FormSection heading={tProfile("idvtCheckSection")}>
                  <Grid container spacing={3}>
                    <Grid container item spacing={3}>
                      <Grid item xs={8}>
                        <Button
                          variant="outlined"
                          onClick={() => setShowModal(true)}>
                          {tProfile("idvtCheckButton")}
                        </Button>
                        <Markdown variant="subtitle">
                          {tProfile("idvtCheckDescription")}
                        </Markdown>
                      </Grid>
                    </Grid>
                  </Grid>
                </FormSection>
                <FormActions>
                  <ProfileNavigationFooter
                    nextStepText={tProfile("experience")}
                    isLoading={updateUser.isPending}
                  />
                </FormActions>
              </>
            </Form>
            <VeriffTermsAndConditions
              open={showModal}
              onClose={() => setShowModal(false)}
            />
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
