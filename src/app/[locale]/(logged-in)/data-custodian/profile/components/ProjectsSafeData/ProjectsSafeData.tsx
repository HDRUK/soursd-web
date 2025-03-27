import React, { useMemo, useCallback, useState } from "react";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "@/components/Form";
import FormControl from "@/components/FormControlWrapper";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  Link,
  MenuItem,
} from "@mui/material";
import DateInput from "@/components/DateInput";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import PageGuidance from "@/modules/PageGuidance";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import FormModalHeader from "@/components/FormModalHeader";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { injectParamsIntoPath } from "@/utils/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postProjectDetailsFromGatewayQuery,
  PutProjectDetailsPayload,
} from "@/services/project_details";
import { RequestFrequency } from "@/consts/projects";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormFieldArray from "@/components/FormFieldArray";
import { formatStringToISO } from "@/utils/date";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import ReactDOMServer from "react-dom/server";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { showAlert } from "@/utils/showAlert";
import ContactLink from "@/components/ContactLink";

interface ProjectsSafeDataProps {
  id: number;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function ProjectsSafeData({ id }: ProjectsSafeDataProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const routes = useStore(state => state.getApplication().routes);
  const { custodian, project, projectDetail } = useStore(state => ({
    custodian: state.getCustodian(),
    project: state.getProject(),
    projectDetail: state.getProject().project_detail,
  }));

  const formatDatasets = (datasets: string | undefined) => {
    if (datasets) {
      const parsedDatasets = JSON.parse(datasets);
      if (Array.isArray(parsedDatasets)) {
        return parsedDatasets;
      }
      return [parsedDatasets];
    }
    return [""];
  };

  const formOptions = {
    defaultValues: {
      datasets: formatDatasets(projectDetail?.datasets) || [""],
      data_sensitivity_level: projectDetail?.data_sensitivity_level || "",
      legal_basis_for_data_article6:
        projectDetail?.legal_basis_for_data_article6 || "",
      duty_of_confidentiality: projectDetail?.duty_of_confidentiality || false,
      national_data_optout: projectDetail?.national_data_optout || false,
      request_frequency:
        projectDetail?.request_frequency || RequestFrequency.ONE_OFF,
      dataset_linkage_description:
        projectDetail?.dataset_linkage_description || "",
      data_minimisation: projectDetail?.data_minimisation || "",
      data_use_description: projectDetail?.data_use_description || "",
      access_date: formatStringToISO(projectDetail?.access_date) || "",
    },
  };

  const queryClient = useQueryClient();

  const { mutateAsync, queryState } = useMutateProjectDetails(project.id);
  useQueryAlerts(queryState);

  const { mutateAsync: getGatewayData, ...postGatewayDataQueryState } =
    useMutation(postProjectDetailsFromGatewayQuery());

  const formMethods = useForm();
  const { reset } = formMethods;

  const [formValues, setFormValues] = useState(formOptions.defaultValues);
  const handleImportFromGateway = useCallback(async () => {
    try {
      const result = await getGatewayData({
        custodian_id: Number(custodian?.id),
        project_id: Number(id),
      });
      if (result.data.length === 1) {
        const newValues = {
          datasets: result.data[0].datasets.map(dataset => dataset.name) || [
            "",
          ],
          data_sensitivity_level: result.data[0].data_sensitivity_level || "",
          legal_basis_for_data_article6:
            result.data[0].legal_basis_for_data_article6 || "",
          duty_of_confidentiality:
            result.data[0].duty_of_confidentiality || false,
          national_data_optout: result.data[0].national_data_optout || false,
          request_frequency:
            result.data[0].request_frequency || RequestFrequency.ONE_OFF,
          dataset_linkage_description:
            result.data[0].dataset_linkage_description || "",
          data_minimisation: result.data[0].data_minimisation || "",
          data_use_description: result.data[0].data_use_description || "",
          access_date: formatStringToISO(result.data[0].access_date) || "",
        };

        setFormValues(newValues);
        showAlert("success", {
          text: t("gatewayImportSuccess"),
          confirmButtonText: t("okButton"),
        });
      } else {
        showAlert("error", {
          text: ReactDOMServer.renderToString(
            t.rich("gatewayImportError", {
              contactLink: ContactLink,
            })
          ),
          confirmButtonText: t("errorButton"),
        });
      }
    } catch (_) {
      showAlert("error", {
        text: ReactDOMServer.renderToString(
          t.rich("gatewayImportError", {
            contactLink: ContactLink,
          })
        ),
        confirmButtonText: t("errorButton"),
      });
    }
  }, [custodian?.id, id, getGatewayData, reset, t]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        datasets: yup.array().of(yup.string()),
        data_sensitivity_level: yup.string(),
        legal_basis_for_data_article6: yup
          .string()
          .required(t("lawfulConditionRequired")),
        duty_of_confidentiality: yup.boolean(),
        national_data_optout: yup.boolean(),
        request_frequency: yup.string(),
        dataset_linkage_description: yup.string(),
        data_minimisation: yup.string(),
        data_use_description: yup.string(),
        access_date: yup.string(),
      }),
    [t]
  );

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    await mutateAsync({
      ...projectDetail,
      ...payload,
    });

    queryClient.refetchQueries({
      queryKey: ["getProject", project.id],
    });
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <FormModalHeader
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2">{t("safeData")}</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadOutlinedIcon />}
          onClick={handleImportFromGateway}
          disabled={!project?.unique_id || postGatewayDataQueryState.isPending}>
          {t("importFromHealthDataResearchGateway")}
        </Button>
      </FormModalHeader>
      <Form onSubmit={handleSubmit} schema={schema} defaultValues={formValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlHorizontal
              displayPlaceholder={false}
              label={t("datasetName")}
              labelMd={0}
              contentMd={12}
              name="datasets"
              sx={{ maxWidth: "55%" }}
              renderField={fieldProps => (
                <FormFieldArray<FormData>
                  name={fieldProps.name}
                  initialRowCount={1}
                  minimumRows={1}
                  createNewRow={() => ""}
                  renderField={(field, index) => (
                    <React.Fragment key={field.name}>
                      <FormControlHorizontal
                        displayLabel={false}
                        labelMd={0}
                        contentMd={12}
                        name={`datasets.${index}`}
                        placeholder={t("datasetsPlaceholder")}
                        renderField={fieldProps => (
                          <TextField {...fieldProps} fullWidth />
                        )}
                      />
                    </React.Fragment>
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="data_sensitivity_level"
              label={t("dataSensitivityLevel")}
              sx={{ maxWidth: "33%" }}
              renderField={props => (
                <Select {...props} fullWidth>
                  <MenuItem value="De-Personalised">
                    {t("dePersonalised")}
                  </MenuItem>
                  <MenuItem value="Personally Identifiable">
                    {t("personallyIdentifiable")}
                  </MenuItem>
                  <MenuItem value="Anonymous">{t("anonymous")}</MenuItem>
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="legal_basis_for_data_article6"
              label={t.rich("lawfulCondition", {
                link: chunks => (
                  <Link href="https://gdpr-info.eu/art-6-gdpr/" target="_blank">
                    {chunks}
                  </Link>
                ),
              })}
              sx={{ maxWidth: "50%" }}
              renderField={props => <TextField {...props} fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlCheckbox
              name="duty_of_confidentiality"
              label={t.rich("lawfulBasisConfirmation", {
                link: chunks => (
                  <Link
                    href="https://www.gov.uk/government/publications/accessing-ukhsa-protected-data/approval-standards-and-guidelines-confidential-patient-information"
                    target="_blank">
                    {chunks}
                  </Link>
                ),
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlCheckbox
              name="national_data_optout"
              label={t("nationalDataOptOut")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="request_frequency"
              label={t("requestFrequency")}
              placeholder=""
              renderField={props => (
                <RadioGroup {...props} row>
                  <FormControlLabel
                    value={RequestFrequency.ONE_OFF}
                    control={<Radio />}
                    label={t("oneOffRequest")}
                  />
                  <FormControlLabel
                    value={RequestFrequency.RECURRING}
                    control={<Radio />}
                    label={t("recurringDataset")}
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="dataset_linkage_description"
              label={t("linkedDatasets")}
              sx={{ maxWidth: "50%" }}
              renderField={props => (
                <TextField {...props} fullWidth multiline rows={4} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="data_minimisation"
              label={t("dataMinimisation")}
              sx={{ maxWidth: "50%" }}
              renderField={props => (
                <TextField {...props} fullWidth multiline rows={4} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="data_use_description"
              label={t("dataDescription")}
              sx={{ maxWidth: "50%" }}
              renderField={props => (
                <TextField {...props} fullWidth multiline rows={4} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              name="access_date"
              label={t("releaseDate")}
              description={t("releaseDateDescription")}
              placeholder=""
              sx={{ maxWidth: "40%" }}
              renderField={props => <DateInput {...props} />}
            />
          </Grid>
          <Grid item xs={12}>
            <ProfileNavigationFooter
              previousHref={injectParamsIntoPath(
                routes.profileCustodianProjectsSafeProject.path,
                {
                  id,
                }
              )}
              isLoading={queryState.isPending}
            />
          </Grid>
        </Grid>
      </Form>
    </PageGuidance>
  );
}
