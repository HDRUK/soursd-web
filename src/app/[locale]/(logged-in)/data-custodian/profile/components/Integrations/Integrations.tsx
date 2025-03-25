import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormFieldArray from "@/components/FormFieldArray";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import Form from "@/components/Form";
import LoadingWrapper from "@/components/LoadingWrapper";
import ContactLink from "@/components/ContactLink";
import yup from "@/config/yup";
import { VALIDATION_URL, VALIDATION_INTEGRATION_ID } from "@/consts/form";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import {
  getWebhookEventTriggerQuery,
  getCustodianWebhooksQuery,
  postCustodianWebhookQuery,
  deleteCustodianWebhookQuery,
} from "@/services/webhooks/index";
import { Webhook } from "@/services/webhooks/types";
import { showAlert } from "@/utils/showAlert";
import { mockedWebhookDescription } from "@/mocks/data/cms";
import FormControlWrapper from "@/components/FormControlWrapper";
import { patchCustodianQuery } from "@/services/custodians";

const NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_FORM = "Form";

interface IntegrationsFormValues {
  gateway_app_id: string;
  gateway_client_id: string;
}

export default function Integrations() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { custodian } = useStore(state => ({
    custodian: state.config.custodian,
  }));

  const { mutateAsync: updateCustodian, isPending } = useMutation(
    patchCustodianQuery(custodian?.id)
  );

  const schema = yup.object<IntegrationsFormValues>().shape({
    gateway_app_id: yup
      .string()
      .matches(VALIDATION_INTEGRATION_ID, tForm("integrationIdFormatInvalid"))
      .required(),
    gateway_client_id: yup
      .string()
      .matches(VALIDATION_INTEGRATION_ID, tForm("integrationIdFormatInvalid"))
      .required(),
  });

  const defaultValues = useMemo(
    () => ({
      gateway_app_id: custodian?.gateway_app_id || "",
      gateway_client_id: custodian?.gateway_client || "",
    }),
    [custodian]
  );

  const handleSubmit = async (fields: IntegrationsFormValues) => {
    updateCustodian(fields).then(() => {
      showAlert("success", {
        text: t("saveSuccess"),
        confirmButtonText: t("okButton"),
      });
    });
  };

  return (
    <PageBody>
      <PageSection heading={t("configurationIntegrations")}>
        <Form<IntegrationsFormValues>
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          key={`${custodian?.id}-integrations`}>
          <>
            <Grid container spacing={3}>
              <Grid container item spacing={3}>
                <Grid item xs={6}>
                  <FormControlWrapper
                    name="gateway_app_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3}>
                <Grid item xs={6}>
                  <FormControlWrapper
                    name="gateway_client_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </Grid>
            </Grid>

            <FormActions>
              <ProfileNavigationFooter
                previousHref={ROUTES.profileCustodianConfigurationWebhooks.path}
                isLoading={isPending}
              />
            </FormActions>
          </>
        </Form>
      </PageSection>
    </PageBody>
  );
}
