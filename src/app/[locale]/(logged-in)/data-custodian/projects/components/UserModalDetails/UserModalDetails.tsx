import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { patchIssuerUser, postIssuerUser } from "@/services/issuer_users";
import { DataCustodianUser } from "@/types/application";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  user: Partial<DataCustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function UserModalDetails({
  user,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  return (
    <FormModal aria-label={`details`} variant="content" {...restProps}>
      hi
    </FormModal>
  );
}
