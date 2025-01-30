import FormModal from "@/components/FormModal";
import SendInviteOrganisation from "@/modules/SendInviteOrganistion";
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

  return (
    <FormModal
      aria-label={t("inviteOrganisation")}
      variant="content"
      open={open}
      onClose={onClose}>
      <SendInviteOrganisation />
    </FormModal>
  );
}
