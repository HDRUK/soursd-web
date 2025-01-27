import FormModal, { FormModalProps } from "@/components/FormModal";
import {
  PostOrganisationInviteUserPayload,
  postOrganisationsInviteUser,
} from "@/services/organisations";
import { Organisation } from "@/types/application";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { EMAIL_TEMPLATE } from "@/consts/application";
import UserModalDetails, { UserFields } from "../UsersModalDetails";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
  organisation: Organisation;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function UsersModal({
  organisation,
  onClose,
  ...restProps
}: UserModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["inviteUser", organisation.id],
    mutationFn: (payload: PostOrganisationInviteUserPayload) => {
      return postOrganisationsInviteUser(organisation?.id, payload, {
        error: { message: "inviteUserError" },
      });
    },
  });

  const handleOnSubmit = useCallback(async (fields: UserFields) => {
    await mutateAsync({ ...fields, identifier: EMAIL_TEMPLATE.USER_INVITE });

    onClose();

    showAlert("success", {
      text: t("inviteSuccessfulDescription"),
      title: t("inviteSuccessfulTitle"),
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getUsers", organisation?.id],
        });
      },
    });
  }, []);

  return (
    <FormModal
      aria-label={t("inviteUserAriaLabel")}
      variant="content"
      onClose={onClose}
      {...restProps}>
      <UserModalDetails
        queryState={{
          isLoading: isPending,
          isError,
          error,
        }}
        onClose={onClose}
        onSubmit={handleOnSubmit}
      />
    </FormModal>
  );
}
