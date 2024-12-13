import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import {
  patchCustodianUser,
  postCustodianUser,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import UserModalDetails, { CustodianUserFields } from "../UsersModalDetails";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  user: Partial<CustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function UsersModal({ user, ...restProps }: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (payload: Omit<CustodianUser, "created_at" | "updated_at">) => {
      if (!user?.id) {
        return postCustodianUser(payload, {
          error: { message: "createUserError" },
        });
      }

      return patchCustodianUser(user.id, payload, {
        error: { message: "updateUserError" },
      });
    },
  });

  const handleOnSubmit = useCallback(async (payload: CustodianUserFields) => {
    await mutateAsync({ ...user, ...payload });

    restProps.onClose();

    showAlert("success", {
      text: user?.id
        ? t("updateSuccessfulDescription")
        : t("createSuccessfulDescription"),
      title: user?.id ? t("updateSuccessfulTitle") : t("createSuccessfulTitle"),
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getCustodianUsers", user?.custodian_id],
        });
      },
    });
  }, []);

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
