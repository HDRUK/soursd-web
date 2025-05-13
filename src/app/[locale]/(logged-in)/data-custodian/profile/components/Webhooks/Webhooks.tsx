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
import { VALIDATION_URL } from "@/consts/form";
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

const NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_FORM = "Form";

interface WebhookFormValues {
  receiver_url: string;
  event_trigger: number;
}

interface WebhookFormData {
  webhooks: WebhookFormValues[];
}

export default function Webhooks() {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { custodian } = useStore(state => ({
    custodian: state.config.custodian,
  }));

  const {
    data: webhooksData,
    refetch: refetchWebhookData,
    isLoading: isWebhooksLoading,
  } = useQuery(getCustodianWebhooksQuery(custodian?.id));

  const { data: webhookEventTriggers } = useQuery(
    getWebhookEventTriggerQuery()
  );
  const { mutateAsync: postWebhook, isPending: isPostLoading } = useMutation(
    postCustodianWebhookQuery()
  );
  const { mutateAsync: deleteWebhook, isPending: isDeleteLoading } =
    useMutation(deleteCustodianWebhookQuery(custodian?.id));

  const schema = yup.object<WebhookFormData>().shape({
    webhooks: yup
      .array()
      .of(
        yup.object().shape({
          receiver_url: yup
            .string()
            .required(tForm("websiteRequiredInvalid"))
            .matches(VALIDATION_URL, tForm("websiteFormatInvalid")),
          event_trigger: yup.number().required(tForm("webhookRequiredInvalid")),
        })
      )
      .defined()
      .test("receiver_url", tForm("duplicateWebhookError"), (webhooks = []) => {
        const seen = new Set();
        for (const { receiver_url } of webhooks) {
          if (seen.has(receiver_url)) return false;
          seen.add(receiver_url);
        }
        return true;
      }),
  });

  const defaultValues = useMemo(
    () => ({
      webhooks: webhooksData?.data.map((data: Webhook) => ({
        receiver_url: data.url,
        event_trigger: data.webhook_event,
      })) || [{ receiver_url: "", event_trigger: 1 }],
    }),
    [webhooksData]
  );

  const handleWebhookOperation = async (
    operation: "add" | "delete",
    webhook: Webhook | WebhookFormValues
  ) => {
    try {
      if (operation === "add") {
        await postWebhook({
          custodian_id: custodian.id,
          url: (webhook as WebhookFormValues).receiver_url,
          webhook_event_id: (webhook as WebhookFormValues).event_trigger,
        });
      } else {
        await deleteWebhook({ id: (webhook as Webhook).id });
      }
      showAlert("success", {
        text: t("saveSuccess"),
        confirmButtonText: t("okButton"),
      });
    } catch (_e) {
      showAlert("error", {
        text: ReactDOMServer.renderToString(
          t.rich("webhookError", { contactLink: ContactLink })
        ),
        confirmButtonText: tForm("errorButton"),
      });
    }
  };

  const handleSubmit = async (fields: WebhookFormData) => {
    const existingWebhooks = webhooksData?.data || [];
    const formWebhooks = fields.webhooks;

    const webhooksToDelete = existingWebhooks.filter(
      existingWebhook =>
        !formWebhooks.some(
          formWebhook =>
            formWebhook.receiver_url === existingWebhook.url &&
            formWebhook.event_trigger === existingWebhook.webhook_event
        )
    );

    const webhooksToAdd = formWebhooks.filter(
      formWebhook =>
        !existingWebhooks.some(
          existingWebhook =>
            existingWebhook.url === formWebhook.receiver_url &&
            existingWebhook.webhook_event === formWebhook.event_trigger
        )
    );

    await Promise.all([
      ...webhooksToDelete.map(webhook =>
        handleWebhookOperation("delete", webhook)
      ),
      ...webhooksToAdd.map(webhook => handleWebhookOperation("add", webhook)),
    ]);

    await refetchWebhookData();
  };

  return (
    <PageBody>
      <LoadingWrapper variant="basic" loading={isWebhooksLoading}>
        <PageSection heading={t("configurationWebhooks")}>
          <Form<WebhookFormData>
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            shouldResetKeep
            key={`${custodian?.id}-${webhooksData ? "webhooks" : "loading"}`}>
            {({ watch }) => {
              const watchedWebhooks = watch("webhooks");
              const isFormChanged =
                JSON.stringify(watchedWebhooks) !==
                JSON.stringify(defaultValues.webhooks);

              return (
                <>
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <FormFieldArray<WebhookFormData>
                        name="webhooks"
                        displayLabel={false}
                        boxSx={{
                          display: "grid",
                          gridTemplateColumns: "10fr 1fr",
                        }}
                        createNewRow={() => ({
                          receiver_url: "",
                          event_trigger: 1,
                        })}
                        renderField={(field, index) => (
                          <Grid container spacing={2} key={field.receiver_url}>
                            <Grid item xs={6}>
                              <FormControlHorizontal
                                label="Receiver URL"
                                required
                                labelMd={0}
                                contentMd={12}
                                name={`webhooks.${index}.receiver_url`}
                                placeholder={tForm("name")}
                                renderField={fieldProps => (
                                  <TextField {...fieldProps} />
                                )}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <FormControlHorizontal
                                label="Event Trigger"
                                required
                                labelMd={0}
                                contentMd={12}
                                name={`webhooks.${index}.event_trigger`}
                                placeholder={tForm("name")}
                                renderField={fieldProps => (
                                  <Select
                                    {...fieldProps}
                                    inputProps={{
                                      "aria-label": tForm(
                                        "webhookEventAriaLabel"
                                      ),
                                    }}>
                                    {webhookEventTriggers?.data.map(
                                      ({ name, id }) => (
                                        <MenuItem value={id} key={id}>
                                          {name}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                )}
                              />
                            </Grid>
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box>{mockedWebhookDescription}</Box>
                  <FormActions>
                    <ProfileNavigationFooter
                      previousHref={
                        ROUTES.profileOrganisationDetailsSectorSizeAndWebsite
                          .path
                      }
                      isLoading={isPostLoading || isDeleteLoading}
                      isDisabled={!isFormChanged}
                    />
                  </FormActions>
                </>
              );
            }}
          </Form>
        </PageSection>
      </LoadingWrapper>
    </PageBody>
  );
}
