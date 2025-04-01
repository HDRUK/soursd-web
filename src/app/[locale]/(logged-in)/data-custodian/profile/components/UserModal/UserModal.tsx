import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { CustodianUserRoles } from "@/consts/custodian";
import { useStore } from "@/data/store";
import {
  patchCustodianUser,
  postCustodianUser,
  postCustodianUserInvite,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { getPermission } from "@/utils/permissions";
import { getCombinedQueryState } from "@/utils/query";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import UserModalDetails, { CustodianUserFields } from "../UsersModalDetails";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  custodianId: number;
  user: Partial<CustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function UsersModal({
  custodianId,
  user,
  onClose,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const permissions = useStore(state => state.config.permissions);
  const queryClient = useQueryClient();

  const { mutateAsync: mutatePostUser, ...updateCustodianUserState } =
    useMutation({
      mutationKey: ["updateCustodianUser"],
      mutationFn: (
        payload: Omit<CustodianUser, "created_at" | "updated_at">
      ) => {
        if (!user?.id) {
          return postCustodianUser(payload, {
            error: { message: "createUserError" },
          });
        }

        return patchCustodianUser(user.id, payload, {
          error: { message: "createUserError" },
        });
      },
    });

  const {
    mutateAsync: mutateAsyncPostInvite,
    ...postCustodianUserInviteState
  } = useMutation({
    mutationKey: ["postCustodianUserInvite"],
    mutationFn: (id: number) => {
      return postCustodianUserInvite(id, {
        error: { message: "postCustodianUserInviteError" },
      });
    },
  });

  const queryState = getCombinedQueryState([
    postCustodianUserInviteState,
    updateCustodianUserState,
  ]);

  const handleOnSubmit = useCallback(
    async (payload: CustodianUserFields) => {
      const { first_name, last_name, email, approver, administrator } = payload;

      let userPermissions: number[] = [];

      const approverPermission = getPermission(
        CustodianUserRoles.APPROVER,
        permissions
      );
      const administratorPermissions = getPermission(
        CustodianUserRoles.ADMINISTRATOR,
        permissions
      );

      if (approver && approverPermission) {
        userPermissions = [approverPermission.id];
      } else if (administrator && administratorPermissions) {
        userPermissions = [administratorPermissions.id];
      }

      const userResponse = await mutatePostUser({
        id: user?.id,
        first_name,
        last_name,
        email,
        permissions: userPermissions,
        custodian_id: custodianId,
      });

      if (!user?.id && userResponse?.data) {
        await mutateAsyncPostInvite(userResponse.data);
      }

      onClose();

      showAlert("success", {
        text: user?.id
          ? t("updateSuccessfulDescription")
          : t("createSuccessfulDescription"),
        title: user?.id
          ? t("updateSuccessfulTitle")
          : t("createSuccessfulTitle"),
        willClose: () => {
          queryClient.refetchQueries({
            queryKey: ["getCustodianUsers", user?.custodian_id],
          });
        },
      });
    },
    [custodianId]
  );

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
