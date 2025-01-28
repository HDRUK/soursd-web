import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import InviteOrganisation from "@/modules/InviteOrganisation";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

interface OrganisationDetailsModalProps {
  open?: boolean;
  onClose(): void;
}

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";

export default function OrganisationDetailsModal({
  open = true,
  onClose,
}: OrganisationDetailsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);
  const handleErrorAlert = () => {
    showAlert("error", {
      text: t.rich("inviteOrganisationError", {
        contactLink: ContactLink,
      }),
      confirmButtonText: t("inviteOrganisationErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteOrganisationSuccess"),
      confirmButtonText: t("inviteOrganisationSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useOrganisationInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return (
    <FormModal
      aria-label={t("inviteOrganisation")}
      variant="content"
      open={open}
      onClose={onClose}>
      <InviteOrganisation onSubmit={handleSubmit} queryState={queryState} />
    </FormModal>
  );
}
