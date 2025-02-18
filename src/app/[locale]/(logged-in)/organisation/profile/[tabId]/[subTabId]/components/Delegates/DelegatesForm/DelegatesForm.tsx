"use client";

import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { showAlert } from "@/utils/showAlert";
import { LoadingButton } from "@mui/lab";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import Form from "@/components/Form";
import {
  PostOrganisationInviteUserPayload,
  postOrganisationInviteUser,
} from "@/services/organisations";
import { EMAIL_TEMPLATE } from "@/consts/application";

export interface DelegatesFormValues {
  department?: string | null;
  full_name: string;
  job_title: string;
  email_address: string;
}

export interface DelegatesFormProps {
  onSuccess: () => void;
}

const NAMESPACE_TRANSLATION_DELEGATES = "Form";
export default function DelegatesForm({ onSuccess }: DelegatesFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_DELEGATES);
  const organisation = useStore(state => state.config.organisation);
  const departments = organisation?.departments || [];

  const filteredDepartments = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["inviteUser", organisation?.id],
    mutationFn: (payload: PostOrganisationInviteUserPayload) => {
      return postOrganisationInviteUser(organisation?.id, payload, {
        error: { message: "inviteUserError" },
      });
    },
  });

  const handleDetailsSubmit = useCallback(
    async (fields: DelegatesFormValues) => {
      try {
        const payload: PostOrganisationInviteUserPayload = {
          email: fields.email_address,
          department_id: Number(fields.department) ?? null,
          first_name: fields.full_name.split(" ")[0],
          last_name: fields.full_name.split(" ")[1],
          role: fields.job_title,
          user_group: "ORGANISATION",
          is_delegate: 1,
          identifier: EMAIL_TEMPLATE.DELEGATE_INVITE,
        };
        await mutateAsync(payload);

        showAlert("success", {
          text: t("postDelegatesSuccess"),
          confirmButtonText: t("closeButton"),
        });
        onSuccess();
      } catch (_) {
        showAlert("error", {
          text: t("postDelegatesError"),
          confirmButtonText: t("errorButton"),
        });
      }
    },
    [mutateAsync, onSuccess, t]
  );
  const schema = useMemo(
    () =>
      yup.object().shape({
        department: yup
          .string()
          .required(t("departmentRequiredInvalid")),
        full_name: yup
          .string()
          .required(t("fullNameRequiredInvalid")),
        job_title: yup
          .string()
          .required(t("jobTitleRequiredInvalid")),
        email_address: yup
          .string()
          .email(t("emailAddressInvalid"))
          .required(t("emailAddressRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      department: "",
      full_name: "",
      job_title: "",
      email_address: "",
    },
  };

  return (
    <Form schema={schema} onSubmit={handleDetailsSubmit} {...formOptions} shouldReset>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <FormControlHorizontal
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
            <FormControlHorizontal
              name="full_name"
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlHorizontal
              name="job_title"
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlHorizontal
              name="email_address"
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
        </Grid>
      <FormActions>
        <LoadingButton
          loading={isPending}
          type="submit"
          endIcon={<AddCircleOutlineIcon />}
          sx={{ marginBottom: "20px" }}>
          {t("save")}
        </LoadingButton>
      </FormActions>
    </Form>
  );
}
