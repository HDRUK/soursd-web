"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";

import yup from "@/config/yup";
import { useMemo, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { LoadingButton } from "@mui/lab";
import { Grid, MenuItem, Select, TextField } from "@mui/material";

import { useTranslations } from "next-intl";
import Markdown from "@/components/Markdown";
import { getUserQuery, patchUserQuery } from "@/services/users";
import Form from "@/components/Form";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQuery } from "@tanstack/react-query";
import DelegateTable from "./DelegateTable";

export interface KeyContactFormValues {
  first_name: string;
  last_name: string;
  department: number;
  email: string;
  job_title: string;
}

const NAMESPACE_TRANSLATION_DELEGATES = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Delegates() {
  const [organisation, user, setUser] = useStore(state => [
    state.getOrganisation(),
    state.getUser(),
    state.setUser,
  ]);

  const t = useTranslations(NAMESPACE_TRANSLATION_DELEGATES);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const departments = organisation?.departments || [];

  const filteredDepartments = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));

  const { mutateAsync: mutateUser, isPending } = useMutation(
    patchUserQuery(user?.id as number)
  );

  const { data: userData, refetch: refetchUserData } = useQuery({
    ...getUserQuery(user?.id as number),
    enabled: false,
  });

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData, setUser]);

  const handleSubmit = async (formData: KeyContactFormValues) => {
    const { first_name, last_name, email, job_title, department } = formData;

    const payload = {
      first_name,
      last_name,
      email,
      role: job_title,
      department_id: department,
    };

    mutateUser(payload).then(() => {
      refetchUserData();
      showAlert("success", {
        text: tProfile("profileUpdateMessage"),
        confirmButtonText: tProfile("closeButton"),
      });
    });
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        department: yup.number().required(),
        email: yup
          .string()
          .email(t("emailInvalid"))
          .required(t("emailRequired")),
        job_title: yup.string().required(t("jobTitleInvalid")),
      }),

    [t]
  );

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      department: user?.departments?.[0]?.id,
      email: user?.email,
      job_title: user?.role,
    },
  };

  return (
    <PageBody>
      <PageSection>
        <Form schema={schema} onSubmit={handleSubmit} {...formOptions}>
          <>
            <FormSection type="form" heading={t("keyContactFormTitle")}>
              <Markdown>{t("keyContactFormDescription")}</Markdown>

              <Grid
                container
                rowSpacing={3}
                sx={{ width: "70%", justifyContent: "flex-start" }}>
                <Grid item xs={12}>
                  <FormControl
                    name="first_name"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="last_name"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="department"
                    renderField={fieldProps => (
                      <Select
                        {...fieldProps}
                        inputProps={{
                          "aria-label": t("departmentNameAriaLabel"),
                        }}>
                        {filteredDepartments?.map(({ label, value }) => (
                          <MenuItem value={value} key={value} id={label}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    name="job_title"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    name="email"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </Grid>
            </FormSection>
            <FormSection>
              <Markdown>{tProfile("delegateAdminDescription")}</Markdown>
              <DelegateTable />
            </FormSection>
            <FormActions>
              <LoadingButton
                loading={isPending}
                type="submit"
                endIcon={<AddCircleOutlineIcon />}
                sx={{ marginBottom: "20px" }}>
                {t("save")}
              </LoadingButton>
            </FormActions>
          </>
        </Form>
      </PageSection>
    </PageBody>
  );
}
