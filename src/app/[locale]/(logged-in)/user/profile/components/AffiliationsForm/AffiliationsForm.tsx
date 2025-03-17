import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlWrapper from "@/components/FormControlWrapper";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { AffiliationRelationship } from "@/consts/user";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import { ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import AskOrganisationModal from "../AskOrganisation";

export interface AffiliationsFormProps {
  onSubmit: (affiliation: ResearcherAffiliation) => void;
  onClose: () => void;
  queryState: MutationState;
  initialValues?: ResearcherAffiliation;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function AffiliationsForm({
  onSubmit,
  onClose,
  queryState,
  initialValues,
}: AffiliationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: organisationsData } = useOrganisationsQuery();

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        from: yup.date().nullable(),
        to: yup.date().nullable(),
        organisation_id: yup
          .string()
          .required(tForm("organisationRequiredInvalid")),
        relationship: yup
          .string()
          .required(tForm("relationshipRequiredInvalid")),
        current_employer: yup.boolean(),
        role: yup.string().required(tForm("roleRequiredInvalid")),
        email: yup
          .string()
          .required(tForm("emailRequiredInvalid"))
          .email(tForm("professionalEmailFormatInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: initialValues?.member_id || "",
      organisation_id: initialValues?.organisation_id || "",
      current_employer: initialValues?.current_employer || false,
      relationship: initialValues?.relationship || "",
      from: initialValues?.from || null,
      to: initialValues?.to || null,
      role: initialValues?.role || "",
      email: initialValues?.email || "",
    },
  };

  const relationshipOptions = [
    {
      label: tApplication("employee"),
      value: AffiliationRelationship.EMPLOYEE,
    },
    {
      label: tApplication("honoraryContract"),
      value: AffiliationRelationship.HONORARY_CONTRACT,
    },
    { label: tApplication("student"), value: AffiliationRelationship.STUDENT },
  ];
  console.log(initialValues);
  return (
    <>
      <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
        {({ watch }) => {
          const isCurrent = watch("current_employer");
          return (
            <>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="organisation_id"
                    renderField={fieldProps => (
                      <Select {...fieldProps}>
                        {(organisationsData ?? []).map(
                          (org: { organisation_name: string; id: string }) => (
                            <MenuItem
                              value={org.id}
                              key={org.id}
                              id={org.organisation_name}>
                              {org.organisation_name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                    description={
                      !!initialValues && !initialValues?.organisation_id ? (
                        <Box sx={{ display: "flex", color: "warning.main" }}>
                          <WarningIcon />
                          <Typography sx={{ color: "warning.main" }}>
                            {tProfile.rich(
                              "affiliationOrganisationWarningMessage",
                              {
                                link: chunks => (
                                  <Link
                                    component="button"
                                    onClick={() => setInviteOpen(true)}
                                    sx={{ pb: 0.4 }}>
                                    {chunks}
                                  </Link>
                                ),
                              }
                            )}
                          </Typography>
                        </Box>
                      ) : (
                        tProfile.rich("organisationNotListed", {
                          link: chunks => (
                            <Link
                              component="button"
                              onClick={() => setInviteOpen(true)}
                              sx={{ pb: 0.25 }}>
                              {chunks}
                            </Link>
                          ),
                        })
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name="from"
                        renderField={fieldProps => (
                          <DateInput {...fieldProps} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name="to"
                        disabled={isCurrent}
                        renderField={fieldProps => (
                          <DateInput {...fieldProps} disabled={isCurrent} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlCheckbox
                    name="current_employer"
                    label={tForm("currentEmployer")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="relationship"
                    renderField={fieldProps => (
                      <SelectInput
                        {...fieldProps}
                        options={relationshipOptions}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="role"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    description={tProfile("memberIdDescription")}
                    name="member_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="email"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                    description={
                      !!initialValues &&
                      !initialValues?.email && (
                        <Box sx={{ display: "flex", color: "warning.main" }}>
                          <WarningIcon />
                          <Typography>
                            {tProfile("affiliationsEmailWarningMessage")}
                          </Typography>
                        </Box>
                      )
                    }
                  />
                </Grid>
              </Grid>
              <FormActions>
                <Button variant="outlined" onClick={onClose}>
                  {tApplication("cancel")}
                </Button>
                <LoadingButton loading={queryState.isPending} type="submit">
                  {tForm("save")}
                </LoadingButton>
              </FormActions>
            </>
          );
        }}
      </Form>
      <AskOrganisationModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
}
