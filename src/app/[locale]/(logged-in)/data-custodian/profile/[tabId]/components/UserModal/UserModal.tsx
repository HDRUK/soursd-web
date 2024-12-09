import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { patchIssuerUser, postIssuerUser } from "@/services/issuer_users";
import { DataCustodianUser } from "@/types/application";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import UserModalDetails, {
  DataCustodianUserFields,
} from "../UsersModalDetails";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  user: Partial<DataCustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function UsersModal({ user, ...restProps }: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["updateIssuerUser"],
    mutationFn: (
      payload: Omit<DataCustodianUser, "created_at" | "updated_at">
    ) => {
      if (!user?.id) {
        return postIssuerUser(payload, {
          error: { message: "createUserError" },
        });
      }

      return patchIssuerUser(user.id, payload, {
        error: { message: "updateUserError" },
      });
    },
  });

  const handleOnSubmit = useCallback(
    async (payload: DataCustodianUserFields) => {
      await mutateAsync({ ...user, ...payload });

      restProps.onClose();

      showAlert("success", {
        text: user?.id
          ? t("updateSuccessfulDescription")
          : t("createSuccessfulDescription"),
        title: user?.id
          ? t("updateSuccessfulTitle")
          : t("createSuccessfulTitle"),
        willClose: () => {
          queryClient.refetchQueries({
            queryKey: ["getIssuerUsers", user?.issuer_id],
          });
        },
      });
    },
    []
  );

  return (
    <FormModal
      aria-label={`${user.first_name} ${user.last_name} details`}
      variant="content"
      {...restProps}>
      {isError && !isPending && <Message severity="error">{t(error)}</Message>}
      {!isPending && (
        <UserModalDetails
          onSubmit={handleOnSubmit}
          user={user}
          queryState={{
            isLoading: isPending,
            isError,
            error,
          }}
        />
      )}
    </FormModal>
  );
}
