import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Grid, TextField, Typography } from "@mui/material";
import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import Form from "@/components/Form";
import yup from "@/config/yup";
import { VALIDATION_INTEGRATION_ID } from "@/consts/form";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { showAlert } from "@/utils/showAlert";
import FormControlWrapper from "@/components/FormControlWrapper";
import { putCustodianQuery } from "@/services/custodians";
import Image from "next/image";

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
    custodian: state.getCustodian(),
  }));

  const { mutateAsync: updateCustodian, isPending } = useMutation(
    putCustodianQuery(custodian?.id)
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
      gateway_client_id: custodian?.gateway_client_id || "",
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
                  <Image
                    src="/images/logos/gateway-main.svg"
                    width={228}
                    height={122}
                    alt={t("dsitLogoAlt")}
                  />
                  <Typography sx={{ my: 1 }}>
                    {t("integrationsDescription")}
                  </Typography>
                </Grid>
              </Grid>
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
