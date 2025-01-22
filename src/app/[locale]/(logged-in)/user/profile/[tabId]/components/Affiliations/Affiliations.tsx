import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import ListInfoItem from "@/components/ListInfoItem";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import Results from "@/components/Results";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherAffiliationEntry from "@/modules/ResearcherAffiliationEntry";
import postAffiliationQuery from "@/services/affiliations/postAffiliationQuery";
import getOrganisationsQuery from "@/services/organisations/getOrganisationsQuery";
import { ResearcherAffiliation } from "@/types/application";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { FieldValues } from "react-hook-form";

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const user = useStore(state => state.config.user);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const { data: organisationsData, ...getOrganisationQueryState } = useQuery(
    getOrganisationsQuery()
  );

  console.log("organisationsData", organisationsData);

  const onSubmit = useCallback(
    async (affiliation: ResearcherAffiliation) => {
      const histories = getHistories();
      const updatedHistories = {
        ...histories,
        affiliations: [...(histories?.affiliations || []), affiliation],
      };

      if (updatedHistories) {
        setHistories(updatedHistories);
      }
    },
    [getHistories, setHistories]
  );

  const {
    mutateAsync,
    isPending,
    isError,
    error: postError,
  } = useMutation(postAffiliationQuery(user));

  const handleDetailsSubmit = useCallback(
    async (fields: TrainingFormValues) => {
      //   try {
      //     const yearsRemaining = calculateYearsRemaining(fields.expires_at);
      //     const formattedFields = {
      //       ...fields,
      //       awarded_at: formatDBDate(fields.awarded_at),
      //       expires_at: formatDBDate(fields.awarded_at),
      //     };
      //     await mutateAsync({
      //       ...formattedFields,
      //       expires_in_years: yearsRemaining,
      //     });
      //     onSubmit({ ...formattedFields, expires_in_years: yearsRemaining });
      //     showAlert("success", {
      //       text: tProfile("postTrainingSuccess"),
      //       confirmButtonText: tProfile("postTrainingSuccessButton"),
      //     });
      //   } catch (_) {
      //     const errorMessage = tProfile("postTrainingError");
      //     showAlert("error", {
      //       text: errorMessage,
      //       confirmButtonText: tProfile("postTrainingErrorButton"),
      //     });
      //   }
      // },
    },
    [mutateAsync, onSubmit, tProfile]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        organisation_id: yup
          .string()
          .required(tForm("organisationRequiredInvalid")),
        current_employer: yup.boolean(),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      organisation_id: "",
      current_employer: false,
    },
  };

  const formFields = [
    {
      name: "organisation_id",
      component: (field: FieldValues) => (
        <SelectInput
          {...field}
          options={(organisationsData?.data?.data || []).map(
            ({ organisation_name, id }) => ({
              label: organisation_name,
              value: id,
            })
          )}
        />
      ),
    },
    { name: "member_id", component: TextField },
    { name: "current_employer", component: Checkbox },
  ];

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form
        onSubmit={handleDetailsSubmit}
        schema={schema}
        {...formOptions}
        sx={{ mb: 3 }}>
        {() => (
          <>
            <FormSection heading={tProfile("training")}>
              <Grid container rowSpacing={3}>
                {formFields.map(field => (
                  <Grid item xs={12} key={field.name}>
                    <FormControlHorizontal
                      name={field.name}
                      renderField={fieldProps => (
                        <field.component {...fieldProps} />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormSection>
            <FormActions>
              <LoadingButton
                type="submit"
                endIcon={<SaveIcon />}
                loading={isPending}
                sx={{ display: "flex", justifySelf: "end" }}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        )}
      </Form>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Affiliation record
      </Typography>
      <Results
        queryState={getOrganisationQueryState}
        noResultsMessage={"No affiliation results"}
        errorMessage={tProfile("errorAffiliationsResults")}
        count={organisationsData?.data?.data?.data?.length}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell>Organisation Name</TableCell>
              <TableCell>Relationship</TableCell>
              <TableCell>Member id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {histories?.affiliations?.map(
              (
                {
                  member_id,
                  current_employer,
                  organisation: { organisation_name },
                },
                i
              ) => (
                <TableRow>
                  <TableCell>{organisation_name}</TableCell>
                  <TableCell>{current_employer}</TableCell>
                  <TableCell>{member_id}</TableCell>
                </TableRow>
              )
            )}{" "}
          </TableBody>
        </Table>
      </Results>
    </PageGuidance>
  );
}
