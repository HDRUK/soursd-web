import React, { useMemo, useCallback } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProjectDetailsByProjectIdQuery,
  postProjectDetailsFromGatewayQuery,
  postProjectDetailsQuery,
  putProjectDetailsQuery,
} from "@/services/project_details";
import { RequestFrequency } from "@/consts/projects";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormFieldArray from "@/components/FormFieldArray";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { formatStringToISO } from "@/utils/date";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import ReactDOMServer from "react-dom/server";

interface ProjectsSafeDataProps {
  id: number;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function ProjectsSafeData({ id }: ProjectsSafeDataProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const routes = useStore(state => state.getApplication().routes);
  const { custodian } = useStore(state => ({
    custodian: state.getCustodian(),
  }));

  const { data: detailsData, refetch } = useQuery(
    getProjectDetailsByProjectIdQuery(id)
  );

  const projectDetailsId = detailsData?.data?.id;
  console.log(detailsData);
  const { data: projectsData } = useQuery(getProjectQuery(id));

  const { mutateAsync: getGatewayData, ...postGatewayDataQueryState } =
    useMutation(postProjectDetailsFromGatewayQuery());

  const { mutateAsync: postProjectDetails, ...postProjectDetailsQueryState } =
    useMutation(postProjectDetailsQuery());

  const { mutateAsync: putProjectDetails, ...putProjectDetailsQueryState } =
    useMutation(putProjectDetailsQuery(projectDetailsId));

  const isEditMode = !!detailsData?.data;

  useQueryAlerts(
    isEditMode ? putProjectDetailsQueryState : postProjectDetailsQueryState,
    {
      errorAlertProps: {
        text: isEditMode
          ? ReactDOMServer.renderToString(
              t.rich("errorUpdateSafeDataMessage", {
                contactLink: chunks => <a href="/contact">{chunks}</a>,
              })
            )
          : ReactDOMServer.renderToString(
              t.rich("errorCreateSafeDataMessage", {
                contactLink: chunks => <a href="/contact">{chunks}</a>,
              })
            ),
      },
      successAlertProps: {
        text: isEditMode
          ? t("successUpdateSafeDataMessage")
          : t("successCreateSafeDataMessage"),
      },
    }
  );

  const formMethods = useForm();
  const { setValue } = formMethods;

  const handleImportFromGateway = useCallback(async () => {
    if (custodian?.id && projectsData?.data.unique_id) {
      try {
        const result = await getGatewayData({
          custodian_id: Number(custodian.id),
          project_id: Number(id),
        });

        setValue("datasets", formatDatasets(result.data?.datasets) || [""]);
        setValue(
          "data_sensitivity_level",
          result.data?.data_sensitivity_level || ""
        );
        setValue(
          "legal_basis_for_data_article6",
          result.data?.legal_basis_for_data_article6 || ""
        );
        setValue(
          "duty_of_confidentiality",
          result.data?.duty_of_confidentiality || false
        );
        setValue(
          "national_data_optout",
          result.data?.national_data_optout || false
        );
        setValue(
          "request_frequency",
          result.data?.request_frequency || RequestFrequency.ONE_OFF
        );
        setValue(
          "dataset_linkage_description",
          result.data?.dataset_linkage_description || ""
        );
        setValue("data_minimisation", result.data?.data_minimisation || "");
        setValue(
          "data_use_description",
          result.data?.data_use_description || ""
        );
        setValue(
          "access_date",
          formatStringToISO(result.data?.access_date) || ""
        );
      } catch (error) {
        console.error("Error importing data from gateway:", error);
        // Handle error, maybe show an error message to the user
      }
    } else {
      console.error("Custodian ID or Project Unique ID is missing");
      // Handle the case where custodian ID or project unique ID is missing
    }
  }, [custodian?.id, projectsData?.data.unique_id, getGatewayData]);

  const schema = useMemo(
    () =>
      yup.object().shape({
        datasets: yup.array().of(yup.string()),
        data_sensitivity_level: yup.string(),
        legal_basis_for_data_article6: yup
          .string()
          .required(t("lawfulConditionRequired")),
        duty_of_confidentiality: yup
          .boolean()
          .oneOf([true], t("lawfulBasisConfirmationRequired")),
        national_data_optout: yup.boolean(),
        request_frequency: yup.string(),
        dataset_linkage_description: yup.string(),
        data_minimisation: yup.string(),
        data_use_description: yup.string(),
        access_date: yup.string(),
      }),
    [t]
  );

  const handleSubmit = async fields => {
    const payload = {
      ...fields,
      project_id: Number(id),
    };

    if (detailsData?.data) {
      await putProjectDetails(payload).then(() => refetch());
    } else {
      await postProjectDetails(payload).then(() => refetch());
    }
  };

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
      datasets: formatDatasets(detailsData?.data.datasets) || [""],
      data_sensitivity_level: detailsData?.data.data_sensitivity_level || "",
      legal_basis_for_data_article6:
        detailsData?.data.legal_basis_for_data_article6 || "",
      duty_of_confidentiality:
        detailsData?.data.duty_of_confidentiality || false,
      national_data_optout: detailsData?.data.national_data_optout || false,
      request_frequency:
        detailsData?.data.request_frequency || RequestFrequency.ONE_OFF,
      dataset_linkage_description:
        detailsData?.data.dataset_linkage_description || "",
      data_minimisation: detailsData?.data.data_minimisation || "",
      data_use_description: detailsData?.data.data_use_description || "",
      access_date: formatStringToISO(detailsData?.data.access_date) || "",
    },
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
          disabled={
            !projectsData?.data.unique_id || postGatewayDataQueryState.isPending
          }>
          {t("importFromHealthDataResearchGateway")}
        </Button>
      </FormModalHeader>
      <Form onSubmit={handleSubmit} schema={schema} {...formOptions}>
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
                  <MenuItem value="Open Data">{t("openData")}</MenuItem>
                  <MenuItem value="Protected Data">
                    {t("protectedData")}
                  </MenuItem>
                  <MenuItem value="Restricted Data">
                    {t("restrictedData")}
                  </MenuItem>
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
              isLoading={
                postProjectDetailsQueryState.isPending ||
                putProjectDetailsQueryState.isPending
              }
            />
          </Grid>
        </Grid>
      </Form>
    </PageGuidance>
  );
}
