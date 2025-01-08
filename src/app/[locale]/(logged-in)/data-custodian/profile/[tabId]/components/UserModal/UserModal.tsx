import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { useStore } from "@/data/store";
import useMutationWriteCustodianUser from "@/queries/useMutationWriteCustodianUser";
import { postCustodianInviteUser } from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import UserModalDetails, { CustodianUserFields } from "../UsersModalDetails";
import { getPermission } from "@/utils/permissions";
import { CustodianUserRoles } from "@/consts/custodian";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  custodianId: number;
  user: Partial<CustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function UsersModal({
  custodianId,
  user,
  onClose,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const permissions = useStore(state => state.config.permissions);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } =
    useMutationWriteCustodianUser({ user, custodianId });

  const {
    mutateAsync: mutateAsyncInvite,
    isPending: isInvitePending,
    isError: isInviteError,
    error: inviteError,
  } = useMutation({
    mutationKey: ["updateCustodianUser"],
    mutationFn: (id: number) => {
      return postCustodianInviteUser(id, {
        error: { message: "createUserError" },
      });
    },
  });

  const handleOnSubmit = useCallback(async (payload: CustodianUserFields) => {
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

    const userResponse = await mutateAsync({
      id: user?.id,
      first_name,
      last_name,
      email,
      permissions: userPermissions,
    });

    if (!user?.id && userResponse?.data)
      await mutateAsyncInvite(userResponse.data);

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
      {isError && !isPending && <Message severity="error">{t(error)}</Message>}
      {!isPending && (
        <UserModalDetails
          onClose={onClose}
          onSubmit={handleOnSubmit}
          user={user}
          queryState={{
            isLoading: isPending || isInvitePending,
            isError: isError || isInviteError,
            error: error || inviteError,
          }}
        />
      )}
    </FormModal>
  );
}
