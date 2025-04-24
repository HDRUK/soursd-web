import Form, { FormProps } from "@/components/Form";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormModalActions from "@/components/FormModalActions";
import yup from "@/config/yup";
import { ResearcherProject } from "@/types/application";
import { PropsWithMutation } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export type ProjectCreateFormProps = PropsWithMutation<
  Omit<FormProps<ResearcherProject>, "children">
>;

const NAMESPACE_TRANSLATION = "Form.ProjectCreate";

export default function ProjectCreateForm({
  mutateState,
  ...restProps
}: ProjectCreateFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string(),
        unique_id: yup.string().required(t("uniqueIdRequiredInvalid")),
      }),
    []
  );

  const { isPending } = mutateState;

  return (
    <Form
      schema={schema}
      disabled={isPending}
      autoComplete="off"
      {...restProps}>
      <FormControlWrapper
        name="title"
        t={t}
        renderField={fieldProps => <TextField {...fieldProps} />}
      />
      Or
      <FormControlWrapper
        name="unique_id"
        description={t("uniqueIdDescription")}
        t={t}
        renderField={fieldProps => <TextField {...fieldProps} />}
      />
      <FormModalActions>
        <LoadingButton type="submit" disabled={isPending} loading={isPending}>
          {t("createButton")}
        </LoadingButton>
      </FormModalActions>
    </Form>
  );
}
