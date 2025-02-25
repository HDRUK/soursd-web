import ContactLink from "@/components/ContactLink";
import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { CustodianUserRoles } from "@/consts/custodian";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useMutationCustodianUser from "@/queries/useMutationCustodianUser";
import { postCustodianUserInviteQuery } from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { getPermission } from "@/utils/permissions";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import UserModalDetails, { CustodianUserFields } from "../UsersModalDetails";

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

  const { mutateAsync: mutateUpdateUser, ...updateCustodianUserState } =
    useMutationCustodianUser(user?.id);

  const {
    mutateAsync: mutateAsyncPostInvite,
    ...postCustodianUserInviteState
  } = useMutation(postCustodianUserInviteQuery());

  const queryState = getCombinedQueryState([
    postCustodianUserInviteState,
    updateCustodianUserState,
  ]);

  const postKey = user?.id ? "update" : "create";

  useQueryAlerts(queryState, {
    successAlertProps: {
      text: t(`${postKey}SuccessDescription`),
      title: t(`${postKey}ErrorDescription`),
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getCustodianUsers", user?.custodian_id],
        });
      },
    },
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        t.rich(`${postKey}ErrorDescription`, {
          contactLink: ContactLink,
        })
      ),
      title: t(`${postKey}ErrorTitle`),
    },
  });

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

      const userResponse = await mutateUpdateUser({
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
