import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import {
  patchCustodianUser,
  postCustodianUser,
  postCustodianUserInvite,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { getCombinedQueryState } from "@/utils/query";
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

export default function UsersModal({
  user,
  onClose,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  const { mutateAsync, ...updateCustodianUserState } = useMutation({
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

  const { mutateAsync: mutateAsyncPost, ...postCustodianUserInviteState } =
    useMutation({
      mutationKey: ["postCustodianUserInvite"],
      mutationFn: (id: number) => {
        return postCustodianUserInvite(id, {
          error: { message: "updateUserError" },
        });
      },
    });

  const queryState = getCombinedQueryState([
    postCustodianUserInviteState,
    updateCustodianUserState,
  ]);

  const handleOnSubmit = useCallback(async (payload: CustodianUserFields) => {
    const custodianUserData = await mutateAsync({ ...user, ...payload });
    await mutateAsyncPost(custodianUserData?.data);

    onClose();

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
      onClose={onClose}
      {...restProps}>
      {queryState.isError && !queryState.isLoading && (
        <Message severity="error">{t(queryState.error[0])}</Message>
      )}
      <UserModalDetails
        onClose={onClose}
        onSubmit={handleOnSubmit}
        user={user}
        queryState={queryState}
      />
    </FormModal>
  );
}
