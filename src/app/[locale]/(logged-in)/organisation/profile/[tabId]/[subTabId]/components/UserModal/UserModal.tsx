import FormModal, { FormModalProps } from "@/components/FormModal";
import SendInviteUser from "@/modules/SendInviteUser";
import { Organisation } from "@/types/application";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

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

  const handleOnSuccess = useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ["getUsers", organisation?.id],
    });
  }, []);

  return (
    <FormModal
      aria-label={t("inviteUserAriaLabel")}
      variant="content"
      onClose={onClose}
      {...restProps}>
      <SendInviteUser
        organisationId={organisation.id}
        onSuccess={handleOnSuccess}
      />
    </FormModal>
  );
}
