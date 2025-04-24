import FormModal from "@/components/FormModal";
import {
  PostCustodianProjectPayload,
  postCustodianProjectQuery,
} from "@/services/custodians";
import { ModalProps } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ProjectsSafeProjectCreateForm from "../ProjectCreateForm";
import useGatewayProjectImport from "@/hooks/useGatewayProjectImport";
import { createProjectDefaultValues } from "@/utils/form";

interface ProjectCreateModalProps extends ModalProps {
  custodianId: number;
}

const NAMESPACE_TRANSLATIONS = "Form.ProjectCreate";

export default function ProjectCreateModal({
  custodianId,
  ...restProps
}: ProjectCreateModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { mutateAsync: mutatePostAsync, ...mutateState } = useMutation(
    postCustodianProjectQuery()
  );

  const { handleImportData } = useGatewayProjectImport();

  const handleSubmit = async (payload: PostCustodianProjectPayload) => {
    const { data: project_id } = await mutatePostAsync({
      params: {
        custodianId,
      },
      payload: createProjectDefaultValues(payload),
    });

    if (payload.unique_id) {
      handleImportData({
        custodian_id: custodianId,
        project_id,
      });
    }
  };

  return (
    <FormModal
      heading={t("heading")}
      {...restProps}
      sx={{
        minWidth: 500,
      }}>
      <ProjectsSafeProjectCreateForm
        onSubmit={handleSubmit}
        mutateState={mutateState}
      />
    </FormModal>
  );
}
