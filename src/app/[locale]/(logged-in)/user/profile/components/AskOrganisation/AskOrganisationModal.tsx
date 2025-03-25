import FormModal from "@/components/FormModal";
import SendInviteOrganisation from "@/modules/SendInviteOrganistion";
import { useTranslations } from "next-intl";

interface OrganisationDetailsModalProps {
  open?: boolean;
  onSuccess?(): void;
  onClose(): void;
  organisationId?: number;
}

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";

export default function OrganisationDetailsModal({
  organisationId,
  open = true,
  onSuccess,
  onClose,
}: OrganisationDetailsModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  return (
    <FormModal
      aria-label={t("inviteOrganisation")}
      variant="content"
      open={open}
      onClose={onClose}>
      <SendInviteOrganisation
        onSuccess={onSuccess}
        onClose={onClose}
        organisationId={organisationId}
      />
    </FormModal>
  );
}
